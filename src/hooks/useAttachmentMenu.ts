import { useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { Camera, Image, MapPin, User, FileText, BarChart3, Calendar } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import {
  AttachmentOption,
  UseAttachmentMenuReturn,
  AttachmentResult,
  AttachmentMenuRef,
} from '../components/chat/shared/types';

const DEFAULT_ATTACHMENT_OPTIONS: AttachmentOption[] = [
  { id: 'photo', label: 'Photo', icon: Image, color: '#3B82F6' },
  { id: 'camera', label: 'Camera', icon: Camera, color: '#6B7280' },
  { id: 'location', label: 'Location', icon: MapPin, color: '#10B981' },
  { id: 'contact', label: 'Contact', icon: User, color: '#6B7280' },
  { id: 'document', label: 'Document', icon: FileText, color: '#3B82F6' },
  { id: 'poll', label: 'Poll', icon: BarChart3, color: '#F59E0B' },
  { id: 'event', label: 'Event', icon: Calendar, color: '#EF4444' },
];

export const useAttachmentMenu = (
  onAttachmentSelected?: (result: AttachmentResult) => void
): UseAttachmentMenuReturn & { options: AttachmentOption[] } => {
  const menuRef = useRef<AttachmentMenuRef>(null);

  const handlePhotoSelection = useCallback(async () => {
    console.log('Photo selection initiated');
    
    try {
      // Request permission first
      console.log('Requesting photo library permissions...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Photo library permission status:', status);
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant photo library access to select images.');
        return;
      }

      // Add delay to ensure UI is ready after menu closes
      console.log('Waiting for UI to stabilize...');
      await new Promise(resolve => setTimeout(resolve, 300));

      // Launch image picker
      console.log('Launching image picker...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        console.log('Photo selected successfully:', asset.uri);
        onAttachmentSelected?.({
          type: 'image',
          data: {
            uri: asset.uri,
            width: asset.width,
            height: asset.height,
            fileSize: asset.fileSize,
            fileName: asset.fileName || 'image.jpg',
          },
        });
      } else {
        console.log('Photo selection was canceled by user');
      }
    } catch (error) {
      console.error('Error in photo selection process:', error);
      Alert.alert(
        'Photo Selection Error', 
        'Failed to open photo library. Please try again or check your device permissions.',
        [{ text: 'OK' }]
      );
    }
  }, [onAttachmentSelected]);

  const handleCameraCapture = useCallback(async () => {
    console.log('Camera capture initiated');
    
    try {
      // Request permission first
      console.log('Requesting camera permissions...');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log('Camera permission status:', status);
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera access to take photos.');
        return;
      }

      // Add delay to ensure UI is ready after menu closes
      console.log('Waiting for UI to stabilize...');
      await new Promise(resolve => setTimeout(resolve, 300));

      // Launch camera
      console.log('Launching camera...');
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        mediaTypes: 'images',
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        console.log('Photo captured successfully:', asset.uri);
        onAttachmentSelected?.({
          type: 'image',
          data: {
            uri: asset.uri,
            width: asset.width,
            height: asset.height,
            fileSize: asset.fileSize,
            fileName: asset.fileName || 'camera_photo.jpg',
          },
        });
      } else {
        console.log('Camera capture was canceled by user');
      }
    } catch (error) {
      console.error('Error in camera capture process:', error);
      Alert.alert(
        'Camera Error', 
        'Failed to open camera. Please try again or check your device permissions.',
        [{ text: 'OK' }]
      );
    }
  }, [onAttachmentSelected]);

  const handleLocationShare = useCallback(async () => {
    console.log('Location sharing initiated');
    
    try {
      // Request permission
      console.log('Requesting location permissions...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission status:', status);
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant location access to share your location.');
        return;
      }

      console.log('Getting current location...');
      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log('Getting address from coordinates...');
      // Get address from coordinates
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const locationData = {
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        address: address[0] || null,
        timestamp: location.timestamp,
      };

      console.log('Location shared successfully:', locationData.coordinates);
      onAttachmentSelected?.({
        type: 'location',
        data: locationData,
      });
    } catch (error) {
      console.error('Error in location sharing process:', error);
      Alert.alert(
        'Location Error', 
        'Failed to get your location. Please try again or check your device permissions.',
        [{ text: 'OK' }]
      );
    }
  }, [onAttachmentSelected]);

  const handleContactShare = useCallback(async () => {
    try {
      // Request permission
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant contacts access to share contacts.');
        return;
      }

      // Note: For a full contact picker, you might want to implement a custom contact selection screen
      // For now, we'll show an alert that this feature is coming soon
      Alert.alert(
        'Contact Sharing',
        'Contact selection feature is coming soon! This would open a contact picker.',
        [{ text: 'OK', onPress: () => console.log('Contact sharing acknowledged') }]
      );

      // Example of how you might get contacts (commented out for now):
      /*
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });
      
      if (data.length > 0) {
        // You would typically show a contact picker here
        const contact = data[0]; // Example: just pick first contact
        onAttachmentSelected?.({
          type: 'contact',
          data: contact
        });
      }
      */
    } catch (error) {
      console.error('Error accessing contacts:', error);
      Alert.alert('Error', 'Failed to access contacts. Please try again.');
    } finally {
      menuRef.current?.hide();
    }
  }, []);

  const handleDocumentSelection = useCallback(async () => {
    console.log('Document selection initiated');
    
    try {
      // Add delay to ensure UI is ready after menu closes
      console.log('Waiting for UI to stabilize...');
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log('Launching document picker...');
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log('Document picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        console.log('Document selected successfully:', asset.name);
        onAttachmentSelected?.({
          type: 'document',
          data: {
            uri: asset.uri,
            name: asset.name,
            size: asset.size,
            mimeType: asset.mimeType,
          },
        });
      } else {
        console.log('Document selection was canceled by user');
      }
    } catch (error) {
      console.error('Error in document selection process:', error);
      Alert.alert(
        'Document Selection Error', 
        'Failed to open document picker. Please try again.',
        [{ text: 'OK' }]
      );
    }
  }, [onAttachmentSelected]);

  const handlePollCreation = useCallback(() => {
    // For poll creation, you might want to navigate to a poll creation screen
    Alert.alert(
      'Create Poll',
      'Poll creation feature is coming soon! This would open a poll creation interface.',
      [{ text: 'OK', onPress: () => console.log('Poll creation acknowledged') }]
    );
  }, []);

  const handleEventCreation = useCallback(() => {
    // For event creation, you might want to navigate to an event creation screen
    Alert.alert(
      'Create Event',
      'Event creation feature is coming soon! This would open an event creation interface.',
      [{ text: 'OK', onPress: () => console.log('Event creation acknowledged') }]
    );
  }, []);

  const handleOptionSelect = useCallback(
    async (optionId: string) => {
      console.log(`Selected attachment option: ${optionId}`);
      try {
        switch (optionId) {
          case 'photo':
            await handlePhotoSelection();
            break;
          case 'camera':
            await handleCameraCapture();
            break;
          case 'location':
            await handleLocationShare();
            break;
          case 'contact':
            await handleContactShare();
            break;
          case 'document':
            await handleDocumentSelection();
            break;
          case 'poll':
            handlePollCreation();
            break;
          case 'event':
            handleEventCreation();
            break;
          default:
            console.warn(`Unknown attachment option: ${optionId}`);
        }
      } catch (error) {
        console.error(`Error handling ${optionId}:`, error);
        Alert.alert('Error', `Failed to handle ${optionId}. Please try again.`);
      }
    },
    [
      handlePhotoSelection,
      handleCameraCapture,
      handleLocationShare,
      handleContactShare,
      handleDocumentSelection,
      handlePollCreation,
      handleEventCreation,
    ]
  );

  return {
    menuRef,
    handleOptionSelect,
    options: DEFAULT_ATTACHMENT_OPTIONS,
  };
};
