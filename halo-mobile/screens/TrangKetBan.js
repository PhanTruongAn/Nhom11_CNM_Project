import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { ViewAnhBia, ViewAnhBiaImage, ViewAvatar, ViewAvatarImage, BtnNhanTin, BtnKetBan } from '../components/tuTao'
//icons
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons";

const TrangKetBan = ({navigation,route}) => {
    const [name, setName] = useState('Nguyễn Văn Tùng');
  return (
    <View style={styles.container}>
            <TouchableOpacity style={{position: 'absolute', top: 20, left: 20, zIndex:10}} onPress={()=>navigation.goBack()}>
                <Octicons name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', top: 20, right: 20, zIndex:10}} onPress={()=>navigation.navigate('BaCham', {name: name})}>
                <Octicons name="kebab-horizontal" size={24} color="black" />
            </TouchableOpacity>
        <ViewAnhBia>
            <ViewAnhBiaImage source={require('./../assets/img/expo-bg1.png')} />
        </ViewAnhBia>
        <ViewAvatar>
            <ViewAvatarImage source={require('./../assets/img/expo-bg1.png')} />
        </ViewAvatar>
        <View style={styles.viewNameText}>
            <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.viewBio}>
            <Text style={styles.bio}>Bạn chưa thể xem nhật ký của {name} khi chưa là bạn bè</Text>
        </View>
        <View style={styles.action}>
            <BtnNhanTin>
                <Octicons name = "comment-discussion" size = {24} color="blue" />
                <Text style={{fontSize:16, fontWeight:500, color:'blue', marginLeft: 10}}>Nhắn tin</Text>
            </BtnNhanTin>
            <BtnKetBan>
                <Octicons name = "person-add" size = {24} color="black" />
            </BtnKetBan>
        </View>
    </View>
  )
}

export default TrangKetBan

const styles = StyleSheet.create({
    container: {
        flex:1 ,
        backgroundColor: '#fff',
        width: '100%'
    },
    viewNameText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    viewBio: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        textAlign: 'center',
    },
    bio: {
        fontSize: 16,
        fontColor: 'lightgray',
    },
    action: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        alignItems: 'center',
    }
})