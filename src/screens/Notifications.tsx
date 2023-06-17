import axios from 'axios';
import {useState, useEffect} from 'react';
import SearchModal from '../components/search/searchModal';
import Layout from '../components/layout/layout';
import {Text} from '@rneui/base';
import {TouchableOpacity, View} from 'react-native';
import {getNotifications} from '../services/get';
import {fontFamily} from '../styles/font';
import {MaterialIcon} from '../components/icon/icon';
import * as RootNavigaton from '../utils/RootNavigation';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications();
    const fetchNotifications = async () => {
      const result = await getNotifications();

      if (result.status === 200) {
        setNotifications(result.data);
      }
    };

    fetchNotifications();
  }, []);

  const handleGoToNotification = (notification: any) => {
    if (notification.customData) {
      RootNavigaton.navigate('Product', {
        id: notification.customData,
      });
    }
  };

  return (
    <Layout hideMenu={true}>
      <View style={{paddingHorizontal: 10}}>
        <View>
          <Text
            style={{
              color: '#8612A7',
              fontWeight: 'bold',
              fontSize: 22,
              marginHorizontal: 10,
              marginBottom: 20,
            }}>
            Notificações
          </Text>
        </View>
        {notifications?.length > 0 && (
          <View>
            {notifications.map((notification: any) => (
              <TouchableOpacity
                key={notification.id}
                onPress={() => handleGoToNotification(notification)}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingTop: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F4E8F8',
                    marginBottom: 10,
                    alignItems: 'center',
                    gap: 12,
                    paddingBottom: 22,
                  }}>
                  <MaterialIcon name="bell-outline" size={24} color="#8612A7" />
                  <View style={{gap: 5, flexGrow: 1}}>
                    <Text
                      style={{
                        color: '#4E4750',
                        fontWeight: '600',
                        fontSize: 18,
                        marginHorizontal: 10,
                        fontFamily: fontFamily,
                      }}>
                      {notification.title}
                    </Text>
                    <Text
                      style={{
                        color: '#4E4750',
                        fontWeight: '400',
                        fontSize: 16,
                        marginHorizontal: 10,
                        fontFamily: fontFamily,
                      }}>
                      {notification.content}
                    </Text>
                  </View>
                  {notification.customData ? (
                    <MaterialIcon
                      name="chevron-right"
                      size={30}
                      color="#8612A7"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </Layout>
  );
};

export default NotificationsScreen;
