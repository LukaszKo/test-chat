import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { X } from 'lucide-react-native';
import { AttachmentMenuProps, AttachmentMenuRef } from './types';

export const AttachmentMenu = forwardRef<AttachmentMenuRef, AttachmentMenuProps>(({
  onOptionSelect,
  options,
}, ref) => {
  const actionSheetRef = React.useRef<ActionSheetRef>(null);

  useImperativeHandle(ref, () => ({
    show: () => actionSheetRef.current?.show(),
    hide: () => actionSheetRef.current?.hide(),
  }));

  const handleOptionSelect = (optionId: string) => {
    onOptionSelect(optionId);
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      headerAlwaysVisible
      gestureEnabled={true}
      statusBarTranslucent
      drawUnderStatusBar={false}
      containerStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <View
        style={{
          padding: 20,
          width: '100%',
        }}>
          
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#1F2937',
            }}>
              Share Content
            </Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Attachment Options Grid */}
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
            {options.map((option) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={{
                    width: '30%',
                    aspectRatio: 1,
                    marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => handleOptionSelect(option.id)}>
                  <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#F3F4F6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}>
                    <IconComponent size={24} color={option.color} />
                  </View>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                    textAlign: 'center',
                    fontWeight: '500',
                  }}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
    </ActionSheet>
  );
});

AttachmentMenu.displayName = 'AttachmentMenu'; 