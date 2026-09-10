'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Trash2, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { availabilityApi, tokenStore } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface Props {
  practitionerId: string;
  isExpertMode?: boolean;
  onBookSlot?: (slotId: string) => void;
}

export default function AvailabilityCalendar({ practitionerId, isExpertMode = false, onBookSlot }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0); // for month sliding

  // New slot form state
  const [startHour, setStartHour] = useState('09');
  const [startMin, setStartMin] = useState('00');
  const [startAmPm, setStartAmPm] = useState('AM');
  
  const [endHour, setEndHour] = useState('05');
  const [endMin, setEndMin] = useState('00');
  const [endAmPm, setEndAmPm] = useState('PM');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, [currentDate, practitionerId]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
      
      const res = await availabilityApi.getAvailability(practitionerId, startDate.toISOString(), endDate.toISOString());
      if (res && (res as any).success && (res as any).data) {
        setSlots((res as any).data.slots);
      }
    } catch (err) {
      toast.error('Failed to load calendar');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async () => {
    if (!selectedDate) return;
    const token = tokenStore.getAccess();
    if (!token) return;

    setCreating(true);
    try {
      const get24Hour = (h: string, ampm: string) => {
        let num = parseInt(h, 10);
        if (ampm === 'PM' && num !== 12) num += 12;
        if (ampm === 'AM' && num === 12) num = 0;
        return num;
      };

      const startDate = new Date(selectedDate);
      startDate.setHours(get24Hour(startHour, startAmPm), parseInt(startMin, 10), 0, 0);

      const endDate = new Date(selectedDate);
      endDate.setHours(get24Hour(endHour, endAmPm), parseInt(endMin, 10), 0, 0);

      if (startDate >= endDate) {
        toast.error('Start time must be before end time');
        setCreating(false);
        return;
      }

      const diffHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
      if (diffHours > 2) {
        toast.error('A single slot cannot be longer than 2 hours');
        setCreating(false);
        return;
      }

      const res = await availabilityApi.createAvailability(token, startDate.toISOString(), endDate.toISOString());
      if (res && (res as any).success) {
        toast.success('Availability added');
        fetchSlots();
      } else {
        toast.error((res as any).message || 'Failed to add availability');
      }
    } catch (err) {
      toast.error('Error adding slot');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    const token = tokenStore.getAccess();
    if (!token) return;

    try {
      const res = await availabilityApi.deleteAvailability(token, slotId);
      if (res && (res as any).success) {
        toast.success('Slot deleted');
        fetchSlots();
      } else {
        toast.error((res as any).message || 'Failed to delete slot');
      }
    } catch (err) {
      toast.error('Error deleting slot');
    }
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Calendar logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const rawFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const firstDayOfMonth = (rawFirstDay + 6) % 7; // Adjust so Monday is 0

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isSameDay = (d1: Date, d2: Date) => 
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  const slotsForSelectedDate = selectedDate
    ? slots.filter(s => isSameDay(new Date(s.startTime), selectedDate))
    : [];

  const getDayStatus = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const daySlots = slots.filter(s => isSameDay(new Date(s.startTime), date));
    
    if (daySlots.length === 0) return 'empty';
    if (daySlots.every(s => s.isBooked)) return 'full';
    return 'available';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8, scale: 0.98 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-extrabold text-2xl text-[#4C1D95] tracking-tight drop-shadow-sm">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-purple-50 text-gray-500 hover:text-purple-700 transition-colors" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-purple-50 text-gray-500 hover:text-purple-700 transition-colors" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-3 text-center text-[11px] tracking-widest uppercase font-extrabold text-pink-400">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d}>{d}</div>)}
        </div>

        <div className="relative overflow-hidden flex-1 min-h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div 
              key={currentDate.toISOString()}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d > 0 ? 20 : -20 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d > 0 ? -20 : 20 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-7 gap-1.5"
            >
              {days.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className="p-2" />;
                
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isSelected = selectedDate && isSameDay(selectedDate, date);
                
                const todayDate = new Date();
                const isToday = isSameDay(date, todayDate);
                
                todayDate.setHours(0,0,0,0);
                const status = getDayStatus(day);
                const isPast = date < todayDate;

                let statusClass = 'text-gray-700 hover:bg-purple-50 hover:text-purple-700 border border-transparent';
                let indicator = null;

                if (status === 'available') {
                  statusClass = 'bg-pink-50 text-pink-700 hover:bg-pink-100 border-pink-200 border shadow-sm hover:scale-105 active:scale-95 font-semibold';
                  indicator = <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-pink-500" />;
                } else if (status === 'full') {
                  statusClass = 'bg-red-50/50 text-red-600 hover:bg-red-50 border-red-100 border';
                  indicator = <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-400 opacity-60" />;
                }

                if (isPast && !isSelected) {
                  statusClass = 'opacity-40 cursor-not-allowed text-gray-400 hover:bg-transparent hover:text-gray-400 border-transparent hover:scale-100 font-normal';
                  indicator = null;
                }

                if (isSelected) {
                  statusClass = 'bg-[#6D28D9] text-white shadow-md shadow-purple-500/40 scale-105 font-extrabold ring-2 ring-purple-300 ring-offset-1';
                  indicator = null;
                } else if (isToday) {
                  statusClass += ' ring-1 ring-inset ring-purple-400 font-bold';
                }

                return (
                  <button
                    key={day}
                    disabled={isPast}
                    onClick={() => setSelectedDate(date)}
                    className={`relative flex flex-col items-center justify-center aspect-square rounded-xl text-sm transition-all duration-200 ${statusClass}`}
                  >
                    {day}
                    {indicator}
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mt-4 px-2 border-t border-gray-50 pt-4">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72₹53,0.4)]"></span> <span className="font-medium text-gray-600">Available</span></div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400 opacity-70"></span> <span className="font-medium text-gray-600">Booked</span></div>
        </div>
      </div>

      <div className="w-px bg-gradient-to-b from-transparent via-gray-100 to-transparent hidden md:block" />

      <div className="w-full md:w-1/2 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate?.toISOString() || 'empty'}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            <div className="mb-5 bg-[#FDF2F8] border border-pink-100 rounded-2xl p-3 flex items-center gap-3 shadow-sm">
              <span className="bg-pink-100 p-2 rounded-xl text-pink-600 shadow-sm">
                <CalendarIcon className="w-5 h-5" />
              </span>
              <h4 className="font-extrabold text-[#831843] text-lg tracking-tight">
                {selectedDate ? selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a date'}
              </h4>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-[320px] pr-2 scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-transparent">
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-purple-400" /></div>
              ) : slotsForSelectedDate.length === 0 ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium text-sm">No available slots for this date.</p>
                  <p className="text-gray-400 text-xs mt-1">Select another day or add new availability.</p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {slotsForSelectedDate.map((slot, idx) => {
                    const start = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                    const end = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                    const isPast = new Date(slot.startTime) < new Date();

                    return (
                      <motion.div 
                        key={slot.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: 10 }}
                        transition={{ delay: idx * 0.04, duration: 0.2 }}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 group ${
                          slot.isBooked 
                            ? 'bg-gray-50/50 border-gray-100 opacity-80' 
                            : isPast 
                              ? 'bg-gray-50 border-gray-100 opacity-50' 
                              : 'bg-white hover:bg-[#F5F3FF] border-gray-100 hover:border-[#DDD6FE] hover:shadow-sm hover:-translate-y-px'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <p className={`font-bold text-[15px] tracking-tight ${slot.isBooked ? 'text-gray-600' : isPast ? 'text-gray-400' : 'text-gray-900 group-hover:text-[#7C3AED] transition-colors'}`}>
                            {start} - {end}
                          </p>
                          <p className={`text-[11px] font-semibold uppercase tracking-wider ${slot.isBooked ? 'text-gray-400' : isPast ? 'text-gray-400' : 'text-[#7C3AED]'}`}>
                            {slot.isBooked ? 'Booked' : isPast ? 'Past' : 'Available'}
                          </p>
                        </div>
                        
                        {isExpertMode ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteSlot(slot.id)} 
                            disabled={slot.isBooked} 
                            className={`rounded-xl transition-all ${slot.isBooked ? 'opacity-0' : 'text-gray-400 hover:text-red-600 hover:bg-red-50 hover:scale-105 active:scale-95'}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => onBookSlot?.(slot.id)} 
                            disabled={slot.isBooked || isPast} 
                            className={`rounded-xl px-5 font-semibold transition-all ${
                              slot.isBooked || isPast 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95'
                            }`}
                          >
                            {slot.isBooked ? 'Booked' : 'Book'}
                          </Button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {isExpertMode && selectedDate && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 pt-5 border-t border-gray-100 bg-white"
              >
                <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Add Availability</h5>
                <div className="flex gap-2.5 items-center">
                  <div className="flex gap-1 items-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all flex-1 group hover:border-gray-300">
                    <select value={startHour} onChange={e => setStartHour(e.target.value)} className="bg-transparent text-sm font-medium outline-none cursor-pointer text-gray-700 appearance-none text-center">
                      {Array.from({length: 12}, (_, i) => String(i+1).padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <span className="text-gray-400 font-bold">:</span>
                    <select value={startMin} onChange={e => setStartMin(e.target.value)} className="bg-transparent text-sm font-medium outline-none cursor-pointer text-gray-700 appearance-none text-center">
                      {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={startAmPm} onChange={e => setStartAmPm(e.target.value)} className="bg-transparent text-sm font-bold text-[#7C3AED] outline-none cursor-pointer appearance-none ml-1">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <span className="text-gray-400 text-sm font-medium shrink-0">to</span>
                  <div className="flex gap-1 items-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all flex-1 group hover:border-gray-300">
                    <select value={endHour} onChange={e => setEndHour(e.target.value)} className="bg-transparent text-sm font-medium outline-none cursor-pointer text-gray-700 appearance-none text-center">
                      {Array.from({length: 12}, (_, i) => String(i+1).padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <span className="text-gray-400 font-bold">:</span>
                    <select value={endMin} onChange={e => setEndMin(e.target.value)} className="bg-transparent text-sm font-medium outline-none cursor-pointer text-gray-700 appearance-none text-center">
                      {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={endAmPm} onChange={e => setEndAmPm(e.target.value)} className="bg-transparent text-sm font-bold text-[#7C3AED] outline-none cursor-pointer appearance-none ml-1">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <Button 
                    onClick={handleCreateSlot} 
                    disabled={creating} 
                    size="icon" 
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl w-10 h-10 shrink-0 shadow-md shadow-purple-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-5 h-5" />}
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
