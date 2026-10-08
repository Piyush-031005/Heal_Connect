async function testSession() {
  const loginRes = await fetch('https://zenauraa.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'deepaksharma45050@gmail.com', password: 'Password123!' })
  });
  const loginData = await loginRes.json();
  
  if (!loginData.success) {
    console.error('Login failed:', loginData);
    return;
  }
  
  const token = loginData.data.accessToken;
  console.log('Login success');
  
  const pracRes = await fetch('https://zenauraa.com/api/practitioners');
  const pracData = await pracRes.json();
  const practitionerId = pracData.data?.practitioners[0]?.id;
  
  if (!practitionerId) {
    console.error('No practitioner found');
    return;
  }
  
  const sessionRes = await fetch('https://zenauraa.com/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ practitionerId, type: 'CHAT' })
  });
  const sessionData = await sessionRes.json();
  console.log('Session response:', sessionData);
}

testSession();
