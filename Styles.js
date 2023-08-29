import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222429',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TopBar: {
        flex: 0.6,
        backgroundColor: '#222429',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'center',

    },
    TopText: {
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#EA6537',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        textAlignVertical: 'top'
    },
    CenterView: {
        flex: 7,
        width: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start'
    },
    BottomView: {
        flex: 1,
        backgroundColor: '#222429',
        width: '100%',
        flexDirection: 'row'
    },
    Bottom_btn: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    BottomImg: {
        height: '30%',
        marginBottom: '5%',
        alignSelf: 'center',
        aspectRatio: 1,
        resizeMode: 'contain'
    },
    BottomText: {
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: '5%',
        color: '#FFFFFF',
        fontStyle: 'italic',
    },
    CenterScView: {
        width: '100%',
        alignContent: 'center',
        alignSelf: 'center',
    },
    CenterImg: {
        width: '100%',
        resizeMode: 'contain',
        aspectRatio: 1,
        justifyContent: 'center'
    },
    CenterText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    InfoView: {
        backgroundColor: '#212121',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    InfoEnter_btn: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    InfoBlock: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    InfoImg: {
        alignContent: 'center',
        justifyContent: 'space-around',
        height: '100%',
        resizeMode: 'contain'
    },
    PlanTitle: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 30,
        zIndex: 999,
        backgroundColor: '#FFFFFF',
        borderRadius: 5
    },
    PlanView: {
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#000000',
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%'
    },
    PlanChoseTitle: {
        marginTop: '5%',
        marginLeft: '5%',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.6)'
    },
    PlanChose_btn: {
        marginTop: '5%',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    PlanChose_text: {
        fontSize: 15,
        color: '#000000',
        flex: 3,
        textAlignVertical: 'center',
        alignSelf: 'center'
    },
    PlanChose_toimg: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    PlanCircles: {
        marginTop: '5%',
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        height: '5%'
    },
    PlanCircleImg: {
        marginRight: '5%',
        flexDirection: 'row',
        width: '20%',
    },
    PlanCircleText: {
        marginLeft: '10%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        alignSelf: 'center',
    },
    PlanTimeBlock: {
        marginTop: '3%',
        flexDirection: 'row',
        width: '80%',
        height: 20,
        alignSelf: 'center',
    },
    PlanTimeChoose: {
        marginLeft: '12.5%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    PlanHorLine: {
        width: '100%',
        backgroundColor: '#000000',
        height: 3,
        position: 'absolute',
        borderRadius: 5,
        alignSelf: 'center'
    },
    PlanVerLine: {
        width: 3,
        height: '100%',
        backgroundColor: '#000000',
        borderRadius: 5,
        marginLeft: '30%'
    },
    PlanSubmit_btn: {
        borderRadius: 30,
        backgroundColor: '#EA6537',
        alignSelf: 'center',
        width: '40%',
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: '2.5%'
    },
    PlanSubmit_text: {
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    PlanDetalView: {
        marginTop: '5%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    PlanDetalFire: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        flex: 1,
        resizeMode: 'contain',
        aspectRatio: 1
    },
    PlanDetalTextView: {
        flex: 9,
        alignSelf: 'flex-start',
        flexDirection: 'column'
    },
    PlanDetalTextUp: {
        marginLeft: '5%',
        fontSize: 20
    },
    PlanDetalTextDown: {
        marginLeft: '5%',
        fontSize: 12
    },
    PlanDetalTo: {
        marginRight: '5%',
        flex: 1,
        resizeMode: 'contain',
        aspectRatio: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    PlanDetalLine: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#000000',
        height: 3,
        marginTop: '3%'
    },
    PlanSpecificText: {
        fontSize: 12,
        marginTop: '5%',
        marginLeft: '10%'
    },
    HomeCourseInfo: {
        margin: 5,
        height: 300,
        aspectRatio: 1.1,
    },
    HomeCourseImg: {
        height: '40%',
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: '5%'
    },
    HomeCourse: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    HomeCourseText: {
        color: '#EA6537',
        fontSize: 12,
        textAlignVertical: 'center',
        marginLeft: '5%'
    },
    HomeCourseInfoText: {
        marginLeft: '5%',
        color: '#A1A1A1',
        fontSize: 12,
        textAlignVertical: 'center'
    },
    HomeTitles: {
        fontSize: 25,
        marginTop: '5%',
        marginLeft: '5%',
        color: '#000000',
        fontWeight: 'bold'
    },
    HomeEquipImgView: {
        width: '95%',
        flexDirection: 'row',
        marginLeft: '5%',
        justifyContent: 'center'
    },
    HomeEquipImg: {
        flex: 1,
        resizeMode: 'cover',
        marginRight: '5%'
    },
    PostView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center'
    },
    PostImg: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    PostTextView: {
        alignSelf:'center',
        alignContent:'center',
        justifyContent: 'center',
        flex: 4,
    },
    PostText: {
        marginTop: '2%',
        fontSize: 12,
        marginLeft: '5%',
    },
    ProfileUpView: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: '40%',
        backgroundColor: '#EEEBF2'
    },
    ProfileUpImg: {
        alignContent:'center',
        width: '50%',
        resizeMode: 'contain',
        alignSelf: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
    },
    ProfileText: {
        fontWeight:'bold',
        alignSelf:'center',
        fontSize: 15,
        textAlignVertical: 'center',
    },
    ProfileView: {
        marginTop:'1%',
        width: '100%',
        height: '10%',
        flexDirection: 'row'
    },
    ProfileImg: {
        justifyContent:'center',
        marginHorizontal: '5%',
        alignSelf: 'center',
        height: '80%',
        resizeMode: 'contain',
        aspectRatio: 1
    },
    BranchView: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        borderRadius: 30,
        borderWidth: 1
    },
    BranchUpText: {
        color: '#EA6537',
        fontSize: 18,
        marginLeft: '10%',
        marginTop: '5%'
    },
    BranchDownText: {
        color: '#606060',
        fontSize: 15,
        marginLeft: '10%',
        marginTop: '2%'
    },
    BackImg: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        alignContent: 'center',
        alignItems: 'center',
    },
    UpBar: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    LogInTitleText: {
        marginTop: '10%',
        marginLeft: '5%',
        fontSize: 40,
        fontWeight: 'bold'
    },
    LogInInput: {
        marginLeft: '10%',
        borderRadius: 20,
        width: '80%',
        textAlignVertical: 'center',
        marginTop: '5%',
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: '#DEDEDE',
        height: '8%',
        alignContent: 'space-around',
        color: '#646464'
    },
    LogInSubmitbtn: {
        marginTop: '5%',
        alignSelf: 'center',
        width: '80%',
        backgroundColor: 'rgba(234,101,55,0.8)',
        borderRadius: 20,
        height: '8%',
        justifyContent: 'center'
    },
    LogInSubmitText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFFFFF'
    },
    LogInTextView: {
        flexDirection: 'row',
        marginTop: '5%',
        alignSelf: 'center',
    },
    LogInText: {
        fontSize: 13,
        color: '#8F8F8F'
    },
    LogInTextbtn: {
        marginLeft: '5%',
    },
    SignUpInput: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%',
        borderBottomWidth: 1.5,
        height: '10%',
        fontSize: 15,
        borderColor: '#A1A1A1',
        color: '#383838'
    },
    SignUpView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%'
    },
    SignUpText: {
        fontSize: 18,
        alignSelf:'center',
        textAlignVertical: 'center',
        color: '#383838',
        justifyContent:'center',
    },
    SignUpbtn: {
        marginLeft: '10%',
        marginRight: '2%',
        justifyContent:'center',
        alignSelf:'center',
        alignContent:'center'
    },
    SignUpImg: {
        justifyContent:'center',
        alignSelf:'center',
        alignContent:'center'
    },
    SignBirthbtn: {
        marginLeft: '5%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#A1A1A1',
        borderRadius: 10,
        flex: 1,
        borderWidth: 2,
    },
    SettingCancel: {
        fontSize: 20,
        marginLeft: '5%',
        marginTop: '5%',
        color: '#C93131'
    },
    TransBalance: {
        fontSize:30,
        fontWeight:'bold',
        marginTop:'5%',
        marginLeft:'5%',
    },
    TransBalanceView:{
        width:'100%',
        alignSelf:'center',
        justifyContent:'center',
        height:200,
        alignContent:'center',
        alignItems:'center'
    },
    TransBalanceText: {
        fontSize:30,
        alignSelf:'center'
    },
    TransLine: {
        alignSelf:'center',
        width:'90%',
        height:5,
        borderRadius:30,
        backgroundColor:'#000000',

    },
    TransTitle: {
        marginTop:'5%',
        marginLeft:'10%',
        fontSize:25,
    },
    TransCards:{
        marginTop:'5%',
        borderRadius:30,
        width:'80%',
        alignSelf:'center',
        height:100,
        backgroundColor:'#D2D2D2'
    },
    TransCardsView:{
        marginTop:'5%',
        width:'90%',
        alignSelf:'center',
        flexDirection:'row',
        alignContent:'space-between',
        justifyContent:'space-between'
    },
    TransText:{
        fontSize:20
    },
    TransTeacher:{
        marginVertical:'5%',
        marginLeft:'5%',
        fontSize:12
    },
    PostInput:{
        maxWidth:'100%',
        margin:'5%',
        fontSize: 15,
        color: '#383838',
        height:'40%',
        textAlignVertical:'top',
    },
    PostInputView:{
        width:'90%',
        height:320,
        alignSelf:'center',
        marginTop:'5%',
        borderRadius:30,
        borderWidth:2,
        borderColor: '#A1A1A1',
    },
    SignUpScView:{
        width:'100%',
        alignSelf:'center',
        backgroundColor:'#FFFFFF'
    }

});

export default styles;