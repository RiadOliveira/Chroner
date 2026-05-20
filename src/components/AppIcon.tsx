import { type ImageProps, Image } from 'react-native';

export default function AppIcon(props: Omit<ImageProps, 'source'>) {
  return (
    <Image source={require('../../assets/icons/notification.png')} {...props} />
  );
}
