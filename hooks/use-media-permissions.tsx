import { useState, useEffect, useCallback } from 'react';

export type MediaType = 'camera' | 'microphone' | 'both';
export type PermissionStatus = 'granted' | 'denied' | 'prompt' | 'unsupported' | 'error';

interface MediaPermissionsState {
  cameraPermission: PermissionStatus;
  microphonePermission: PermissionStatus;
  stream: MediaStream | null;
  error: Error | null;
  errorMessage: string;
}

interface MediaPermissionsActions {
  requestPermissions: (mediaType?: MediaType) => Promise<boolean>;
  stopMediaStream: () => void;
  checkPermissions: () => Promise<void>;
}

/**
 * Custom hook for handling media permissions (camera and microphone)
 * 
 * @param initiallyRequestPermissions - Whether to request permissions when the hook is initialized
 * @param initialMediaType - The initial media type to request
 * @returns An object containing permission states and actions
 */
export function useMediaPermissions(
  initiallyRequestPermissions: boolean = false,
  initialMediaType: MediaType = 'both'
): MediaPermissionsState & MediaPermissionsActions {
  const [state, setState] = useState<MediaPermissionsState>({
    cameraPermission: 'prompt',
    microphonePermission: 'prompt',
    stream: null,
    error: null,
    errorMessage: '',
  });

  /**
   * Get a user-friendly error message based on the error
   */
  const getErrorMessage = useCallback((error: Error): string => {
    if (!error) return '';
    
    switch (error.name) {
      case 'NotAllowedError':
        return 'Permission to use camera or microphone was denied. Please update your browser settings to allow access.';
      case 'NotFoundError':
        return 'No camera or microphone found. Please check your devices and try again.';
      case 'NotReadableError':
        return 'Your camera or microphone is already in use by another application.';
      case 'OverconstrainedError':
        return 'The requested camera constraints cannot be satisfied.';
      case 'SecurityError':
        return 'Media access is not allowed in this context due to security restrictions.';
      case 'AbortError':
        return 'The operation was aborted, possibly because of hardware issues.';
      case 'TypeError':
        return 'Invalid constraints or parameters were provided.';
      default:
        return `Error accessing media: ${error.message}`;
    }
  }, []);

  /**
   * Check if the browser supports the necessary APIs for media access
   */
  const isBrowserSupported = useCallback((): boolean => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }, []);

  /**
   * Check the current permission state
   */
  const checkPermissions = useCallback(async (): Promise<void> => {
    if (!isBrowserSupported()) {
      setState(prev => ({
        ...prev,
        cameraPermission: 'unsupported',
        microphonePermission: 'unsupported',
        error: new Error('Browser not supported'),
        errorMessage: 'Your browser does not support camera or microphone access.'
      }));
      return;
    }

    try {
      // Only check if the Permissions API is available
      if (navigator.permissions) {
        const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        
        setState(prev => ({
          ...prev,
          cameraPermission: cameraPermission.state as PermissionStatus,
          microphonePermission: microphonePermission.state as PermissionStatus,
        }));
      }
    } catch (error) {
      console.warn('Permissions API not available, cannot check permissions state', error);
    }
  }, [isBrowserSupported]);

  /**
   * Request camera and/or microphone permissions
   */
  const requestPermissions = useCallback(async (mediaType: MediaType = 'both'): Promise<boolean> => {
    if (!isBrowserSupported()) {
      setState(prev => ({
        ...prev,
        cameraPermission: 'unsupported',
        microphonePermission: 'unsupported',
        error: new Error('Browser not supported'),
        errorMessage: 'Your browser does not support camera or microphone access.'
      }));
      return false;
    }

    // Clean up any existing stream
    if (state.stream) {
      stopMediaStream();
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: mediaType === 'both' || mediaType === 'camera',
        audio: mediaType === 'both' || mediaType === 'microphone',
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setState(prev => ({
        ...prev,
        cameraPermission: constraints.video ? 'granted' : prev.cameraPermission,
        microphonePermission: constraints.audio ? 'granted' : prev.microphonePermission,
        stream: stream,
        error: null,
        errorMessage: '',
      }));

      return true;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        cameraPermission: mediaType === 'camera' || mediaType === 'both' ? 'denied' : prev.cameraPermission,
        microphonePermission: mediaType === 'microphone' || mediaType === 'both' ? 'denied' : prev.microphonePermission,
        error: error,
        errorMessage: getErrorMessage(error),
      }));

      return false;
    }
  }, [isBrowserSupported, getErrorMessage, state.stream]);

  /**
   * Stop all tracks in the media stream
   */
  const stopMediaStream = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach(track => track.stop());
      setState(prev => ({ ...prev, stream: null }));
    }
  }, [state.stream]);

  // Initial check for permissions
  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  // Request permissions on initialization if specified
  useEffect(() => {
    if (initiallyRequestPermissions) {
      requestPermissions(initialMediaType);
    }
    
    // Clean up the stream when the component unmounts
    return () => {
      if (state.stream) {
        stopMediaStream();
      }
    };
  }, [initiallyRequestPermissions, initialMediaType, requestPermissions, state.stream, stopMediaStream]);

  return {
    ...state,
    requestPermissions,
    stopMediaStream,
    checkPermissions,
  };
}