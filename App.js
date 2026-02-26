import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qgppnxpezkqfqdcazrol.supabase.co', 'YOUR_KEY_HERE');

export function useMagicalSync() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 1. Fetch initial scroll of events
    const fetchEvents = async () => {
      const { data } = await supabase.from('magical_events').select('*');
      setEvents(data);
    };
    fetchEvents();

    // 2. Listen for "Whispers" (Realtime updates)
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'magical_events' }, 
        (payload) => {
          if (payload.eventType === 'INSERT') setEvents(prev => [...prev, payload.new]);
          if (payload.eventType === 'DELETE') setEvents(prev => prev.filter(e => e.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return events;
}
