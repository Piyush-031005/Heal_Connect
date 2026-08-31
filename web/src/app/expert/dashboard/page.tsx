'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { tokenStore, sessionsApi, practitionersApi, type PractitionerProfile } from '@/lib/api';
import { getSocket, disconnectSocket } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  MessageCircle, LogOut, Wifi, WifiOff, User, Clock,
  IndianRupee, Star, TrendingUp, Bell, ChevronRight,
  Sparkles, HeartHandshake, Phone,
} from 'lucide-react';

interface ActiveSession {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  user: { id: string; name: string | null; photoUrl: string | null };
}

export default function ExpertDashboardPage() {
  const router = useRouter();
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [profile, setProfile] = useState<PractitionerProfile | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [sessionsDone, setSessionsDone] = useState(0);
  const [togglingOnline, setTogglingOnline] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const fetchSessions = useCallback(() => {
    const token = tokenStore.getAccess();
    if (!token) return;
    sessionsApi.practitionerActive(token).then((res) => {
      if (res.success && res.data) setSessions(res.data.sessions);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node))
        setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const token = tokenStore.getAccess();
    const role = localStorage.getItem('hc_role');
    const pid = localStorage.getItem('hc_practitioner_id');

    if (!token || role !== 'practitioner' || !pid) {
      router.replace('/expert/login');
      return;
    }

    setPractitionerId(pid);

    practitionersApi.get(pid).then((res) => {
      if (res.success && res.data) {
        setProfile(res.data.practitioner);
        setIsOnline(res.data.practitioner.isOnline);
      }
    });

    fetchSessions();

    sessionsApi.practitionerHistory(token).then((res) => {
      if (res.success && res.data) {
        setTotalEarnings(res.data.totalEarnings);
        setSessionsDone(res.data.sessions.length);
      }
    });

    const socket = getSocket(token);
    socket.on('new_session_request', (data: ActiveSession) => {
      setSessions((prev) => prev.find((s) => s.id === data.id) ? prev : [data, ...prev]);
    });
    
    socket.on('session_terminated', ({ sessionId }: { sessionId: string }) => {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    });

    const poll = setInterval(fetchSessions, 15000);
    return () => {
      clearInterval(poll);
      socket.off('new_session_request');
      socket.off('session_terminated');
    };
  }, [router, fetchSessions]);

  const toggleOnline = async () => {
    const token = tokenStore.getAccess();
    if (!token || !practitionerId) return;
    setTogglingOnline(true);
    const next = !isOnline;
    await practitionersApi.setAvailability(token, practitionerId, next);
    setIsOnline(next);
    setTogglingOnline(false);
  };

  const handleLogout = () => {
    disconnectSocket();
    tokenStore.clear();
    localStorage.removeItem('hc_role');
    localStorage.removeItem('hc_practitioner_id');
    localStorage.removeItem('hc_practitioner_name');
    router.push('/expert/login');
  };

  const firstName = profile?.name?.split(' ')[0] || 'Expert';
  const initials = profile?.name?.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() || 'E';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none fixed">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,180,107,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,196,182,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/40 dark:bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ZenAuraa" width={32} height={32} className="rounded-full shadow-[0_0_10px_rgba(214,180,107,0.5)]" />
            <span className="text-xl font-extrabold text-primary uppercase tracking-wide">ZenAuraa</span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-2 text-xs font-semibold text-accent bg-accent/10 border border-accent/30 rounded-full px-2 py-0.5 shadow-[0_0_10px_rgba(46,196,182,0.1)]">
              <Sparkles className="w-3 h-3" /> Expert
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Online toggle */}
            <button
              onClick={toggleOnline}
              disabled={togglingOnline}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                isOnline
                  ? 'bg-accent/20 text-accent border-accent/30 shadow-[0_0_15px_rgba(46,196,182,0.2)]'
                  : 'bg-secondary text-muted-foreground border-border hover:bg-white/10 hover:text-foreground'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-accent animate-pulse' : 'bg-gray-500'}`} />
              {isOnline ? 'Online' : 'Go Online'}
            </button>

            {/* Profile menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all overflow-hidden shadow-[0_0_15px_rgba(214,180,107,0.4)]"
              >
                {profile?.photoUrl
                  ? <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
                  : initials}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#121420] border border-border rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border bg-secondary">
                    <p className="text-sm font-bold text-foreground truncate tracking-wide">{profile?.name}</p>
                    <p className="text-xs text-primary truncate">{profile?.specialties?.[0] || 'Expert'}</p>
                  </div>
                  <Link href="/expert/profile" onClick={() => setShowProfileMenu(false)} className="w-full px-4 py-3 hover:bg-secondary transition-colors flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">My Profile</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full px-4 py-3 hover:bg-red-900/20 transition-colors flex items-center gap-3">
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-400">Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 relative z-10">

        {/* ── Welcome Banner ── */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 md:p-8 border border-primary/20 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-secondary border border-border flex items-center justify-center text-foreground text-3xl font-extrabold overflow-hidden shrink-0 shadow-[0_0_20px_rgba(214,180,107,0.2)]">
                {profile?.photoUrl
                  ? <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
                  : initials}
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary text-sm font-medium mb-1 tracking-wide uppercase">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Expert Dashboard</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Hello, {firstName}!</h1>
                <p className="text-muted-foreground text-sm mt-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  {profile?.specialties?.slice(0, 2).join(' · ') || 'Wellness Expert'} <span className="text-muted-foreground">|</span> <span className="text-foreground font-semibold">₹{profile?.perMinuteRate}/min</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${
                isOnline ? 'bg-accent text-primary-foreground shadow-[0_0_15px_rgba(46,196,182,0.3)]' : 'bg-secondary border border-border text-muted-foreground'
              }`}>
                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                {isOnline ? 'Accepting Sessions' : 'Currently Offline'}
              </div>
              {!isOnline && (
                <button onClick={toggleOnline} className="text-xs text-primary hover:text-foreground transition-colors underline underline-offset-4">
                  Go online to receive sessions →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Earnings', value: `₹${totalEarnings.toFixed(2)}`, icon: IndianRupee, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
            { label: 'Sessions Done', value: String(sessionsDone), icon: MessageCircle, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
            { label: 'Avg Rating', value: profile?.avgRating ? String(profile.avgRating) : '—', icon: Star, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
            { label: 'Active Now', value: sessions.length > 0 ? String(sessions.length) : '0', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
          ].map((stat) => (
            <Card key={stat.label} className="bg-secondary border border-border shadow-lg backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-colors">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.border} border flex items-center justify-center shrink-0`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* ── Active Sessions (left 2/3) ── */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Incoming</p>
                <h2 className="text-2xl font-extrabold text-foreground">Active Sessions</h2>
              </div>
              {sessions.length > 0 && (
                <span className="flex items-center gap-2 text-xs font-bold text-accent bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 shadow-[0_0_10px_rgba(46,196,182,0.1)]">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {sessions.length} waiting
                </span>
              )}
            </div>

            {sessions.length === 0 ? (
              <div className="bg-secondary rounded-3xl border border-dashed border-border p-16 text-center backdrop-blur-sm">
                <div className="w-20 h-20 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(214,180,107,0.05)]">
                  <MessageCircle className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-muted-foreground mb-2">No active sessions</p>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  {isOnline ? 'Waiting for users to connect. Keep this page open.' : 'Go online to start receiving session requests from users.'}
                </p>
                {!isOnline && (
                  <button
                    onClick={toggleOnline}
                    className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(214,180,107,0.3)]"
                  >
                    <Wifi className="w-4 h-4" /> Go Online Now
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-5 shadow-lg hover:border-primary/50 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#121420] border border-border flex items-center justify-center text-foreground font-bold text-xl shrink-0 overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                      {session.user.photoUrl
                        ? <img src={session.user.photoUrl} alt={session.user.name ?? ''} className="w-full h-full object-cover" />
                        : <User className="w-6 h-6 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-lg tracking-wide">{session.user.name ?? 'Anonymous User'}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border ${
                          session.type === 'CHAT' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' : 'bg-purple-400/10 text-purple-400 border-purple-400/20'
                        }`}>
                          {session.type === 'CHAT' ? <MessageCircle className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                          {session.type}
                        </span>
                        <span className="text-gray-700">|</span>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-lg border border-border">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => router.push(`/session/${session.id}`)}
                      className="bg-accent hover:bg-accent/90 text-primary-foreground border-0 rounded-xl px-8 h-12 font-bold shadow-[0_0_20px_rgba(46,196,182,0.3)] shrink-0 w-full sm:w-auto transition-all"
                    >
                      Join Session
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Profile Card (right 1/3) ── */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Your Profile</p>
              <h2 className="text-2xl font-extrabold text-foreground">Overview</h2>
            </div>

            <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden relative z-10">
              <div className="h-24 bg-gradient-to-r from-white/5 to-white/10 border-b border-border relative">
                 <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(214,180,107,0.2)_0%,rgba(0,0,0,0)_60%)]" />
              </div>
              <CardContent className="px-6 pb-6 -mt-10 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#121420] border-2 border-border flex items-center justify-center text-foreground text-2xl font-extrabold overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] mb-4">
                  {profile?.photoUrl
                    ? <img src={profile.photoUrl} alt={profile?.name} className="w-full h-full object-cover" />
                    : initials}
                </div>
                <p className="font-bold text-foreground text-xl tracking-wide">{profile?.name}</p>
                <p className="text-sm text-primary font-medium mt-1 mb-5">{profile?.specialties?.slice(0, 2).join(' · ') || '—'}</p>

                <div className="space-y-3 pt-5 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">Status</span>
                    <span className={`flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-lg border ${
                      isOnline ? 'bg-accent/10 text-accent border-accent/20' : 'bg-gray-800 text-muted-foreground border-gray-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-accent' : 'bg-gray-500'}`} />
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">Rate</span>
                    <span className="text-sm font-bold text-foreground">₹{profile?.perMinuteRate}/min</span>
                  </div>
                </div>

                <button
                  onClick={toggleOnline}
                  disabled={togglingOnline}
                  className={`w-full mt-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg border-0 ${
                    isOnline
                      ? 'bg-white/10 text-foreground hover:bg-white/20'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(214,180,107,0.3)]'
                  }`}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
