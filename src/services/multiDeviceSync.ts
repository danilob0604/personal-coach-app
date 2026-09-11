// Multi-device real-time sync service via SSE and local Vite middleware

type SyncEventHandler = (data: { type: string; payload: any; senderId?: string; timestamp?: number }) => void;

let eventSource: EventSource | null = null;
const listeners = new Set<SyncEventHandler>();

// Unique device ID for current tab/device session
const getDeviceId = (): string => {
  if (typeof window === 'undefined') return 'server';
  let id = sessionStorage.getItem('pc_sync_device_id');
  if (!id) {
    id = 'dev-' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('pc_sync_device_id', id);
  }
  return id;
};

export const currentDeviceId = typeof window !== 'undefined' ? getDeviceId() : 'server';

export const initMultiDeviceSync = (onConnectionChange?: (connected: boolean) => void) => {
  if (typeof window === 'undefined' || eventSource) return;

  try {
    eventSource = new EventSource('/api/sync/stream');

    eventSource.onopen = () => {
      onConnectionChange?.(true);
    };

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        // Ignore events sent by this same device instance
        if (data.senderId && data.senderId === currentDeviceId) {
          return;
        }
        for (const listener of listeners) {
          listener(data);
        }
      } catch (err) {
        console.error('Error parsing sync event:', err);
      }
    };

    eventSource.onerror = () => {
      onConnectionChange?.(false);
    };
  } catch (e) {
    console.warn('Multi-device sync not supported or failed to init:', e);
    onConnectionChange?.(false);
  }
};

export const subscribeToSync = (handler: SyncEventHandler): (() => void) => {
  listeners.add(handler);
  return () => {
    listeners.delete(handler);
  };
};

export const publishSyncEvent = async (type: string, payload: any): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const res = await fetch('/api/sync/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        payload,
        senderId: currentDeviceId,
        timestamp: Date.now()
      })
    });
    return res.ok;
  } catch (e) {
    console.warn('Could not publish sync event:', e);
    return false;
  }
};
