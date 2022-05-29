import { StyleSheet } from 'react-native';
import Colors from './color';

export default StyleSheet.create({
    homeContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colors.mustard1
    },
    dashBoardContainer:{
        flex:1,
        backgroundColor: Colors.mustard1,
    },
    homeTitleContainer:{
        padding:10,        
        justifyContent:'center',
        alignItems:'center'
    },
    homeTitleText:{
        fontFamily:'Baloo2-Bold',
        fontSize:30,
        color:Colors.orange2,
    },
    homeSubTitleText:{
        fontFamily:'Baloo2-SemiBold',
        fontSize:25,
        color:Colors.brown1,
    },
    homeExplainingText:{
        fontFamily:'Baloo2-SemiBold',
        fontSize:20,
        color:Colors.white,
    },
    homeInput:{
        width:'80%',
        height:40,
        backgroundColor:Colors.white,
        borderRadius:20,
        borderWidth:2,
        paddingHorizontal:15,
        fontFamily:'Baloo2-Medium',
        color: Colors.orange1,
        marginBottom:30
    },
    userInputContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    homeScreenButton:{
        backgroundColor: Colors.brown1,
        padding:10,
        borderRadius:20,
        borderWidth:2,
        borderColor: Colors.white
    },
    homeScreenButtonBlock:{
        backgroundColor: Colors.brown1,
        padding:10,
        borderRadius:20,
        borderWidth:2,
        borderColor: Colors.white,
        opacity: 0.5
    },
    homeButtonText:{
        fontFamily:'Baloo2-SemiBold',
        fontSize:20,
        color:Colors.white,
    },
    dashboardUpBar:{
        width:'100%',        
        height:120,
        backgroundColor:Colors.orange1,
        flexDirection:'row',
        marginBottom:30
    },
    arrowBackContainer:{
        height:120,
        width:'20%',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:30
    },
    dashBoardUpTextContainer:{
        width:'80%',
        justifyContent:'center',        
        paddingTop:30
    },
    dashBoardUpText:{
        fontFamily:'Baloo2-Bold',
        fontSize:25,
        color:Colors.white,
    },
    postContainer: {
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    noPostContainer:{
        flex:1, width:'100%',
        alignItems:'center',
        justifyContent:'center',        
    },
    noPostText:{
        fontFamily:'Baloo2-SemiBold',
        fontSize:25,
        color:Colors.white,
        marginBottom:100
    }
})