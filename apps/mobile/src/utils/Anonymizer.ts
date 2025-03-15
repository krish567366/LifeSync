import { sha256 }  from 'react-native-sha256';

export const anonymizeData = async (data: any) => {
  const hashedEmail = await sha256(data.email);
  return {
    ...data,
    email: hashedEmail,
    ip: 'xxx.xxx.xxx.xxx',
    deviceId: await sha256(data.deviceId),
  };
};