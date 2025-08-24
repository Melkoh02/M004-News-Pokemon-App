import {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Avatar, Searchbar} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {SearchBarNavProp} from '../../lib/types/navigation.ts';
import UserAccountModal from '../organisms/userAccountModal.tsx';

const MainSearchBar = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<SearchBarNavProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [userAccountModalOpen, setUserAccountModalOpen] = useState(false);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
      }}>
      <Searchbar
        mode="bar"
        placeholder={t('common.search')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon={'menu'}
        onIconPress={() => navigation.openDrawer()}
        right={props => (
          <Avatar.Image
            {...props}
            size={30}
            source={require('../../assets/images/defaultAvatar.png')}
            onTouchEnd={() => setUserAccountModalOpen(true)}
          />
        )}
      />
      <UserAccountModal
        onDismiss={() => {
          setUserAccountModalOpen(false);
        }}
        isVisible={userAccountModalOpen}
      />
    </View>
  );
};

export default MainSearchBar;
