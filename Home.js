import {
    Alert, FlatList,
    Image,
    ImageBackground, LayoutAnimation, Modal, Platform, Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet, Switch,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    UIManager,
    View
} from 'react-native';
import storage from "./storage";
import {useEffect, useRef, useState} from "react";
import styles from "./Styles";
import {Video} from "expo-av";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Home({navigation,route}) {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const APIUrl='https://e199-140-136-151-161.jp.ngrok.io/';
    const [PageIndex,setPageIndex]=useState(Number(2));
    const [BeginView,setBeginView]=useState(true);
    const [Course,setCourse]=useState('點選以選擇課程');
    const [Shop,setShop]=useState('點選以選擇分店');
    const [Teacher,setTeacher]=useState('點選以選擇老師');
    const [ChooseDays,setChooseDays]=useState([false,false,false,false,false,false,false]);
    const [TimePeriod,setTimePeriod]=useState([false,false,false])
    const [TeacherInfo,setTeacherInfo]=useState({});
    const [CourseInfo,setCourseInfo]=useState({})
    const [PostInfo,setPostInfo]=useState([])
    const [CourseChoose,setCourseChoose]=useState(false);
    const [ShopChoose,setShopChoose]=useState(false);
    const [TeacherChoose,setTeacherChoose]=useState(false);
    const [SpecficTeacherInfo,setSpecificTeacherInfo]=useState({'Name':'','Gender':'','Level':'','ID':''})
    const [SpecficTeacherChoose,setSpecficTeacherChoose]=useState(false);
    const [PersonalInfo,setPersonalInfo]=useState({'Name':'','Gender':'男','Level':'','MemberID':''})
    const [TitleBarText,setTitleBarText]=useState(['About Us','Book Now!','','BLOG',''])
    const [InfoChange,setInfoChange]=useState(true);

    useEffect(()=>{
        try{
            setPersonalInfo({
                'Name':route.params.Name,
                'Gender':route.params.Gender,
                'Level':route.params.Member_type,
                'MemberID':route.params.Member_id
            });
        }
        catch (e) {
            console.log(e);
        }
    },[route.params,InfoChange])

    useEffect(() => {
        try{
            storage.load({key: 'LoginInfo', autoSync: true, syncInBackground: true,})
                .then(ret => {
                    const data={
                        'Email':ret.Email,
                        'Password':ret.Password
                    }
                    fetch(APIUrl+'/Get/SignIn',{method:'POST',headers:{
                            'Accept': 'application/json',
                            'Content-Type':'application/json'
                        },body:JSON.stringify(data)})
                        .then((response) => response.json())
                        .then(async (responseJson) => {
                            console.log('Data Get!');
                            console.log('Data:',responseJson);
                            console.log('Data Set!');
                            if(responseJson.Status){
                                route.params=responseJson;
                                setInfoChange(!InfoChange);
                            }
                            else{
                                Alert.alert('非常抱歉','帳號或密碼錯誤!');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            Alert.alert('非常抱歉', '出現些許錯誤 請重試!');
                        });
                });
        }
        catch (e) {
            console.log(e)
        }

    },[])

    useEffect(
        ()=>{
            fetch(APIUrl + '/Get/CoachDatas', {
                method: 'GET'})
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('Data Get!');
                    console.log('Data:',responseJson);
                    console.log('Data Set!');
                    setTeacherInfo(responseJson['Datas']);
                })
                .catch((error) => {
                    console.log(error);
                })
            fetch(APIUrl + '/Get/CourseDatas', {
                method: 'GET'})
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('Data Get!');
                    console.log('Data:',responseJson);
                    console.log('Data Set!');
                    setCourseInfo(responseJson['Datas']);
                })
                .catch((error) => {
                    console.log(error);
                })
            fetch(APIUrl + '/Get/PostDatas', {
                method: 'GET'})
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('Data Get!');
                    console.log('Data:',responseJson);
                    console.log('Data Set!');
                    setPostInfo(responseJson['Datas']);
                })
                .catch((error) => {
                    console.log(error);
                })
            setTimeout(() => {
                if(BeginView){
                    setBeginView(false);
                }}, 7 * 1000);
        }
        ,[])

    const ReloadPost=()=>{
        fetch(APIUrl + '/Get/PostDatas', {
            method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Data Get!');
                console.log('Data:',responseJson);
                console.log('Data Set!');
                setPostInfo(responseJson['Datas']);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const ChangePage=(index)=>{
        setPageIndex(index);
    };

    const CourseChooseFnc=(index)=>{
        if(index===0){
            setCourse('拳擊   Boxing');
        }
        else if(index===1){
            setCourse('懸吊訓練 TRX');
        }
        else if(index===2){
            setCourse('心肺訓練 Cardio&Sculpt');
        }
        else if(index===3){
            setCourse('舞動舞蹈 Dance');
        }
        else if(index===4){
            setCourse('飛輪心率 Cycling');
        }
        setCourseChoose(false);
        setTeacher('點選以選擇老師');
        setSpecificTeacherInfo({'Name':'','Gender':'','Level':'','ID':''});
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    const ShopChooseFnc=(index)=>{
        if(index===0){
            setShop('台北');
        }
        else if(index===1){
            setShop('新北');
        }
        else if(index===2){
            setShop('台中');
        }
        else if(index===3){
            setShop('台南');
        }
        else if(index===4){
            setShop('高雄');
        }
        setShopChoose(false);
        setTeacher('點選以選擇老師');
        setSpecificTeacherInfo({'Name':'','Gender':'','Level':'','ID':''});
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    const CheckHasTeacher=()=>{
        if(TeacherInfo[Shop+','+Course.substring(5)]===undefined){
            Alert.alert('非常抱歉','該場館目前沒有該項課程的教練!');
            return;
        }
        else {
            setTeacherChoose(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }
    }

    const TeacherChooseFnc=(index)=>{
        setTeacher(TeacherInfo[Shop+','+Course.substring(5)][index].Name)
        setSpecificTeacherInfo({
            'Name':TeacherInfo[Shop+','+Course.substring(5)][index].Name,
            'Gender':TeacherInfo[Shop+','+Course.substring(5)][index].Gender,
            'Level':TeacherInfo[Shop+','+Course.substring(5)][index].Level,
            'ID':TeacherInfo[Shop+','+Course.substring(5)][index].ID
        })
        setTeacherChoose(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    const GetDayChoose=(index) => {
        let tmp=[...ChooseDays]
        tmp[index]=!tmp[index]
        setChooseDays(tmp);
    }

    const JoinUs=()=>{
        if(Course==='點選以選擇課程'){
            Alert.alert('非常抱歉','請先選擇課程!');
            return;
        }
        else if(Shop==='點選以選擇分店'){
            Alert.alert('非常抱歉','請先選擇分店!');
            return ;
        }
        else if(Teacher==='點選以選擇老師'){
            Alert.alert('非常抱歉','請先選擇老師!');
            return ;
        }
        let HasClass=false;
        for (var i=0;i<ChooseDays.length;i++){
            let Result=false;
            for (var j=0;j<TimePeriod.length;j++){
                Result|=(CourseInfo[Course.substring(5)].Time[i][j]&TimePeriod[j])
            }
            HasClass|=(Result&ChooseDays[i])
        }
        if(HasClass){
            if(PersonalInfo.MemberID===''){
                navigation.navigate('SignIn');
                return;
            }
            const data={
                'Gym_Name':Shop,
                'Coach_ID':SpecficTeacherInfo.ID,
                'Course':Course.substring(5),
                'Member_ID':PersonalInfo.MemberID
            }
            fetch(APIUrl+'/Post/JoinUs',{method:'POST',headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },body:JSON.stringify(data)})
                .then((response) => response.json())
                .then(async (responseJson) => {
                    console.log('Data Get!');
                    console.log('Data:',responseJson);
                    console.log('Data Set!');
                    if(responseJson.Status){
                        Alert.alert('恭喜','您已成功預約課程!')
                    }
                    else{
                        Alert.alert('非常抱歉','出現些許錯誤 請重新下訂課程!');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('非常抱歉', '出現些許錯誤 請重試!');
                });
        }
        else{
            Alert.alert('非常抱歉','您所選擇的時段內未有該項課程!')
        }
    }

    if(BeginView){
        return (
            <View style={{width:'100%',height:'100%',justifyContent:'center',backgroundColor:'#000000'}}>
                <Video
                    resizeMode={'stretch'}
                    ref={video}
                    style={StyleSheet.absoluteFill}
                    source={require('./icon/play.mp4')}
                    shouldPlay={true}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                {/*<Image source={require('./icon/intro.png')} style={{position:'absolute',height:'100%',alignSelf:'center',justifyContent:'center'}}></Image>*/}
                <Pressable style={[styles.InfoImg,{position:'absolute',alignContent:'center',width:'100%'}]} onPress={()=>{setBeginView(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);}}>
                    <View style={styles.InfoBlock}></View>
                    <View style={styles.InfoBlock}></View>
                    <Text style={[styles.CenterText,{fontSize:40,color:'#EA6537'}]}>GYMSTER</Text>
                    <View style={styles.InfoBlock}>
                        <Text style={[styles.CenterText,{fontSize:12}]}>AMBITION</Text>
                        <Text style={[styles.CenterText,{fontSize:12}]}>IS</Text>
                        <Text style={[styles.CenterText,{fontSize:12}]}>THE FIRST STEP TOWARDS</Text>
                    </View>
                    <View style={styles.InfoBlock}></View>
                    <Text style={[styles.CenterText,{fontSize:12}]}>Touch to Start</Text>
                </Pressable>
            </View>
        )
    }

    else{
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.TopBar,{flexDirection:'row'}]}>
                    {PageIndex===3 &&(
                        <TouchableOpacity style={{flex:1,marginLeft:'5%'}} onPress={ReloadPost}>
                            <Image style={{width:'100%',resizeMode:'contain'}} source={require('./icon/Refresh.png')}></Image>
                        </TouchableOpacity>
                    )}
                    <Text style={[styles.TopText,{flex:8,textAlign:'center'}]}>{TitleBarText[Number(PageIndex)]}</Text>
                    {PageIndex===3 &&(
                        <TouchableOpacity style={{flex:1,marginRight:'5%'}} onPress={()=>{
                            if(PersonalInfo.MemberID===''){
                                navigation.navigate('SignIn');
                                return;
                            }
                            navigation.navigate('Post',{Member_ID:PersonalInfo.MemberID,Gender:PersonalInfo.Gender})}}>
                            <Image style={{width:'100%',resizeMode:'contain'}} source={require('./icon/Addpost.png')}></Image>
                        </TouchableOpacity>

                    )}
                </View>
                {PageIndex===0 &&(
                    <View style={[styles.CenterView,{backgroundColor:'#222429'}]}>
                        <ScrollView style={styles.CenterScView}>
                            <ImageBackground source={require('./icon/aboutup.png')} style={styles.CenterImg}>
                                <Text style={[styles.CenterText,{fontSize:40}]}>GYMSTER</Text>
                                <Text style={[styles.CenterText,{fontSize:18}]}>AMBITION</Text>
                                <Text style={[styles.CenterText,{fontSize:18}]}>IS</Text>
                                <Text style={[styles.CenterText,{fontSize:18}]}>THE FIRST STEP TOWARDS</Text>
                            </ImageBackground>

                            <ImageBackground source={require('./icon/aboutdown.png')} style={[styles.CenterImg,{justifyContent:'flex-start',aspectRatio: 0.7}]}>
                                <Text style={[styles.CenterText,{fontSize:25,textAlign:'left',marginTop:'5%'}]}>   簡介:</Text>
                                <Text style={[styles.CenterText,{fontSize:15,maxWidth:'90%',textAlign:'left',marginTop:'3%',lineHeight:25}]}>     隨著健康問題逐漸被青壯年重視，越來越多人有至健身房健身、接受諮詢甚至參加教練課程的意願。因此我們決定選擇健身房系統當此專題的主題。</Text>
                                <Text style={[styles.CenterText,{fontSize:15,maxWidth:'90%',textAlign:'left',marginTop:'1%',lineHeight:25}]}>     我們設計一家大型的連鎖健身房，每一家分店有數名員工、教練、會員，每個人都有屬於自己的ID編號，用以方便管理。並且，精準紀錄每個會員的姓名、性別、生日、電話號碼、會員等級。</Text>
                                <Text style={[styles.CenterText,{fontSize:15,maxWidth:'90%',textAlign:'left',marginTop:'1%',lineHeight:25}]}>     其中會員將分為若干類，各自紀錄id號碼和等級型別，並選擇對應的會員卡給會員。會員一次只能選擇一特定的教練課程，但在平常的器具使用上，是可以自由登記使用的。
                                    另外，我們還提供社論平台，讓成員在上完課或使用器材後，可以自由發布文章，表達自己的想法，並且沒有貼文篇數限制。</Text>
                            </ImageBackground>
                        </ScrollView>
                    </View>
                )}
                {PageIndex===1 &&(
                    <View style={styles.CenterView}>
                        <Text style={styles.PlanTitle}>立即預約</Text>
                        <View style={{position:'absolute',marginTop:'5%',width:'80%',alignSelf:'center',height:13,zIndex:995}}></View>
                        <ScrollView style={[styles.PlanView,{marginTop:'5%'}]}>
                            <Text style={styles.PlanChoseTitle}>選擇課程</Text>
                            <View style={{borderRadius:30,backgroundColor:'#FFFFFF'}}>
                                {(!CourseChoose) &&
                                    <TouchableOpacity style={styles.PlanChose_btn} onPress={()=>{setTeacherChoose(false);setCourseChoose(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);}}>
                                        <Text style={styles.PlanChose_text}>{Course}</Text>
                                        <Image source={require('./icon/PlanChose_Vector.png')} style={styles.PlanChose_toimg}></Image>
                                    </TouchableOpacity>
                                }
                                {CourseChoose &&
                                    <View style={styles.PlanView}>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{CourseChooseFnc(0);}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>拳擊</Text>
                                                <Text style={styles.PlanDetalTextDown}>Boxing</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{CourseChooseFnc(1)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>懸吊訓練</Text>
                                                <Text style={styles.PlanDetalTextDown}>TRX</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{CourseChooseFnc(2)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>心肺訓練</Text>
                                                <Text style={styles.PlanDetalTextDown}>Cardio & Sculpt</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{CourseChooseFnc(3)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>舞動舞蹈</Text>
                                                <Text style={styles.PlanDetalTextDown}>Dance class</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={[styles.PlanDetalView,{marginBottom:'5%'}]} onPress={()=>{CourseChooseFnc(4)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>飛輪心率</Text>
                                                <Text style={styles.PlanDetalTextDown}>Indoor Cycling</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            <Text style={styles.PlanChoseTitle}>選擇分店</Text>
                            <View style={{borderRadius:30,backgroundColor:'#FFFFFF'}}>
                                {(!ShopChoose) &&
                                    <TouchableOpacity style={styles.PlanChose_btn} onPress={()=>{setTeacherChoose(false);setShopChoose(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);}}>
                                        <Text style={styles.PlanChose_text}>{Shop}</Text>
                                        <Image source={require('./icon/PlanChose_Vector.png')} style={styles.PlanChose_toimg}></Image>
                                    </TouchableOpacity>
                                }
                                {ShopChoose &&
                                    <View style={styles.PlanView}>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{ShopChooseFnc(0);}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>台北</Text>
                                                <Text style={styles.PlanDetalTextDown}>Taipei City</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{ShopChooseFnc(1)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>新北</Text>
                                                <Text style={styles.PlanDetalTextDown}>New Taipei City</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{ShopChooseFnc(2)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>台中</Text>
                                                <Text style={styles.PlanDetalTextDown}>Taichung City</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={styles.PlanDetalView} onPress={()=>{ShopChooseFnc(3)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>台南</Text>
                                                <Text style={styles.PlanDetalTextDown}>Tainan City</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.PlanDetalLine}></View>
                                        <TouchableOpacity style={[styles.PlanDetalView,{marginBottom:'5%'}]} onPress={()=>{ShopChooseFnc(4)}}>
                                            <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                            <View style={styles.PlanDetalTextView}>
                                                <Text style={styles.PlanDetalTextUp}>高雄</Text>
                                                <Text style={styles.PlanDetalTextDown}>Kaohsung City</Text>
                                            </View>
                                            <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>
                            <Text style={styles.PlanChoseTitle}>選擇老師</Text>
                            <View style={styles.PlanChose_btn}>
                                <View style={{flex:9,justifyContent:'center'}}>
                                    {(!TeacherChoose) &&
                                        <TouchableOpacity style={{flexDirection:'row'}} onPress={CheckHasTeacher}>
                                            <Text style={styles.PlanChose_text}>{Teacher}</Text>
                                            <Image source={require('./icon/PlanChose_Vector.png')} style={styles.PlanChose_toimg}></Image>
                                        </TouchableOpacity>
                                    }
                                    {TeacherChoose &&
                                        <View style={[styles.PlanView,{marginTop:0}]}>
                                            {TeacherInfo[Shop+','+Course.substring(5)].map((item,index)=>{
                                                return(
                                                    <TouchableOpacity key={index} style={[styles.PlanDetalView,{marginBottom:(TeacherInfo[Shop+','+Course.substring(5)].length-1===index) ? '5%':'0%'}]} onPress={()=>{TeacherChooseFnc(index);}}>
                                                        <Image style={styles.PlanDetalFire} source={require('./icon/Fire.png')}></Image>
                                                        <View style={styles.PlanDetalTextView}>
                                                            <Text style={[styles.PlanDetalTextUp,{marginLeft: '10%',textAlignVertical:'center'}]}>{item.Name}</Text>
                                                        </View>
                                                        <Image style={styles.PlanDetalTo} source={require('./icon/To.png')}></Image>
                                                    </TouchableOpacity>
                                                )}
                                            )}
                                        </View>
                                    }
                                </View>
                                <View style={{flex:SpecficTeacherChoose?7:1}}>
                                    {(!SpecficTeacherChoose) &&
                                        <TouchableOpacity onPress={()=>{setSpecficTeacherChoose(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);}}>
                                            <Image source={require('./icon/PlanChose_Teacher_Info.png')} style={[styles.PlanChose_toimg]}></Image>
                                        </TouchableOpacity>
                                    }
                                    {SpecficTeacherChoose &&(
                                        <View style={[styles.PlanView,{marginTop:0}]}>
                                            <Text style={[styles.PlanSpecificText,{fontSize: 20}]}>教練資訊</Text>
                                            <Text style={styles.PlanSpecificText}>姓名: {SpecficTeacherInfo.Name}</Text>
                                            <Text style={styles.PlanSpecificText}>性別: {SpecficTeacherInfo.Gender}</Text>
                                            <Text style={styles.PlanSpecificText}>等級: {SpecficTeacherInfo.Level}</Text>
                                            <TouchableOpacity style={[styles.PlanSubmit_btn,{marginVertical:'5%'}]} onPress={()=>{setSpecficTeacherChoose(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);}}>
                                                <Text style={[styles.PlanSubmit_text,{fontSize: 12}]}>取消</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>

                            <Text style={styles.PlanChoseTitle}>選擇時間(星期)</Text>
                            <View style={styles.PlanCircles}>
                                <TouchableOpacity style={styles.PlanCircleImg} onPress={()=>{GetDayChoose(0);}}>
                                    <Image source={ChooseDays[0]==true?require('./icon/PlanChose_RadioButtom_Yes.png'):require('./icon/PlanChose_RadioButton.png')} style={{width:'45%',resizeMode:'contain',alignSelf:'center'}}></Image>
                                    <Text style={styles.PlanCircleText}>一</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.PlanCircleImg} onPress={()=>{GetDayChoose(1);}}>
                                    <Image source={ChooseDays[1]?require('./icon/PlanChose_RadioButtom_Yes.png'):require('./icon/PlanChose_RadioButton.png')} style={{width:'45%',resizeMode:'contain',alignSelf:'center'}}></Image>
                                    <Text style={styles.PlanCircleText}>二</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.PlanCircleImg} onPress={()=>{GetDayChoose(2);}}>
                                    <Image source={ChooseDays[2]?require('./icon/PlanChose_RadioButtom_Yes.png'):require('./icon/PlanChose_RadioButton.png')} style={{width:'45%',resizeMode:'contain',alignSelf:'center'}}></Image>
                                    <Text style={styles.PlanCircleText}>三</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.PlanCircleImg} onPress={()=>{GetDayChoose(3);}}>
                                    <Image source={ChooseDays[3]?require('./icon/PlanChose_RadioButtom_Yes.png'):require('./icon/PlanChose_RadioButton.png')} style={{width:'45%',resizeMode:'contain',alignSelf:'center'}}></Image>
                                    <Text style={styles.PlanCircleText}>四</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.PlanCircles}>
                                <TouchableOpacity style={styles.PlanCircleImg} onPress={()=>{GetDayChoose(4);}}>
                                    <Image source={ChooseDays[4]?require('./icon/PlanChose_RadioButtom_Yes.png'):require('./icon/PlanChose_RadioButton.png')} style={{width:'45%',resizeMode:'contain',alignSelf:'center'}}></Image>
                                    <Text style={styles.PlanCircleText}>五</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.PlanCircleImg} onPress={()=>{GetDayChoose(5);}}>
                                    <Image source={ChooseDays[5]?require('./icon/PlanChose_RadioButtom_Yes.png'):require('./icon/PlanChose_RadioButton.png')} style={{width:'45%',resizeMode:'contain',alignSelf:'center'}}></Image>
                                    <Text style={styles.PlanCircleText}>六</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.PlanCircleImg} onPress={()=>{GetDayChoose(6);}}>
                                    <Image source={ChooseDays[6]?require('./icon/PlanChose_RadioButtom_Yes.png'):require('./icon/PlanChose_RadioButton.png')} style={{width:'45%',resizeMode:'contain',alignSelf:'center'}}></Image>
                                    <Text style={styles.PlanCircleText}>日</Text>
                                </TouchableOpacity>

                            </View>
                            <Text style={styles.PlanChoseTitle}>時段</Text>
                            <View style={styles.PlanTimeBlock}>
                                {/*thumbColor={TimePeriod[0] ? "#EA6537":"#FFFFFF"}*/}
                                <Switch style={[styles.PlanTimeChoose,{marginLeft:'10%'}]} trackColor={{ false: "#767577", true: 'rgba(234,101,55,0.6)' }} value={TimePeriod[0]} onValueChange={(value)=>{let tmp=[...TimePeriod];tmp[0]=value;setTimePeriod(tmp);}}></Switch>
                                <Switch style={styles.PlanTimeChoose} trackColor={{ false: "#767577", true: 'rgba(234,101,55,0.6)'  }} value={TimePeriod[1]} onValueChange={(value)=>{let tmp=[...TimePeriod];tmp[1]=value;setTimePeriod(tmp);}}></Switch>
                                <Switch style={styles.PlanTimeChoose} trackColor={{ false: "#767577", true: 'rgba(234,101,55,0.6)'  }} value={TimePeriod[2]} onValueChange={(value)=>{let tmp=[...TimePeriod];tmp[2]=value;setTimePeriod(tmp);}}></Switch>
                            </View>
                            <View style={styles.PlanTimeBlock}>
                                <View style={styles.PlanHorLine}></View>
                                <View style={[styles.PlanVerLine,{marginLeft:'2.5%'}]}></View>
                                <View style={styles.PlanVerLine}></View>
                                <View style={styles.PlanVerLine}></View>
                                <View style={styles.PlanVerLine}></View>
                            </View>
                            <View style={[styles.PlanTimeBlock,{marginBottom:'10%',height:20}]}>
                                <Text style={{flex:1,textAlign:'center'}}>9:00~12:00</Text>
                                <Text style={{flex:1,textAlign:'center'}}>14:00~17:00</Text>
                                <Text style={{flex:1,textAlign:'center'}}>19:00~22:00</Text>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.PlanSubmit_btn} onPress={JoinUs}>
                            <Text style={styles.PlanSubmit_text}>JOIN US</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {PageIndex===2 &&(
                    <View style={styles.CenterView}>
                        <ScrollView style={styles.CenterScView}>
                            <Text style={styles.HomeTitles}>TRENDING COURSES</Text>
                            <ScrollView horizontal={true}>
                                {Object.keys(CourseInfo).map((item,index)=>{
                                    return(
                                        <View key={index} style={styles.HomeCourseInfo}>
                                            <Image style={styles.HomeCourseImg} source={require('./icon/CS.png')}></Image>
                                            <Text style={[styles.HomeCourseText,{fontSize:30}]}>{item}</Text>
                                            <View style={styles.HomeCourse}>
                                                <Text style={styles.HomeCourseInfoText}>Time: {CourseInfo[item].period} Hour</Text>
                                                <Text style={styles.HomeCourseInfoText}>Price: NT {CourseInfo[item].price}</Text>
                                            </View>
                                            <Text style={styles.HomeCourseText}>{CourseInfo[item].description}</Text>
                                        </View>
                                    )}
                                )}
                            </ScrollView>
                            <Text style={styles.HomeTitles}>Equipments</Text>
                            <View style={styles.HomeEquipImgView}>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment0.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment1.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment2.png')}></Image>
                            </View>
                            <View style={styles.HomeEquipImgView}>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment3.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment4.png')}></Image>
                            </View>
                            <View style={styles.HomeEquipImgView}>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment5.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment6.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment7.png')}></Image>
                            </View>
                            <View style={styles.HomeEquipImgView}>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment8.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment9.png')}></Image>
                            </View>
                            <View style={styles.HomeEquipImgView}>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment10.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment11.png')}></Image>
                                <Image style={styles.HomeEquipImg} source={require('./icon/Equiment12.png')}></Image>
                            </View>
                        </ScrollView>
                    </View>
                )}
                {PageIndex===3 &&(
                    <View style={styles.CenterView}>
                        <FlatList style={{width:'100%'}} data={PostInfo} renderItem={({ item }) => (
                            <View  style={styles.PostView}>
                                <Image style={styles.PostImg} source={item.Gender==='男'?require('./icon/boy.png'):require('./icon/girl.png')}></Image>
                                <View  style={styles.PostTextView}>
                                    <Text style={[styles.PostText,{fontSize: 20}]}>{item.Title}</Text>
                                    <Text style={styles.PostText}>{item.Name}</Text>
                                    <Text style={styles.PostText}>{item.Content}</Text>
                                </View>
                            </View>
                        )} keyExtractor={(item,index)=>{return index.toString()}}>
                        </FlatList>
                    </View>
                )}
                {PageIndex===4 &&(
                    <View style={styles.CenterView}>
                        <View style={styles.CenterScView}>
                            <View style={styles.ProfileUpView}>
                                <Image style={styles.ProfileUpImg} source={PersonalInfo.Gender==='男'?require('./icon/boy.png'):require('./icon/girl.png')}></Image>
                                <Text style={[styles.ProfileText,{alignSelf:'center',marginTop:'2%'}]}>Name : {PersonalInfo.Name}</Text>
                                <Text style={[styles.ProfileText,{alignSelf:'center',marginTop:'2%'}]}>LEVEL : {PersonalInfo.Level}</Text>
                            </View>
                            <TouchableOpacity style={styles.ProfileView} onPress={()=>{
                                if(PersonalInfo.MemberID===''){
                                    navigation.navigate('SignIn');
                                    return;
                                }
                                navigation.navigate('Setting',{Member_ID:PersonalInfo.MemberID,Gender:PersonalInfo.Gender});}}>
                                <Image style={styles.ProfileImg} source={require('./icon/Setting.png')}></Image>
                                <Text style={styles.ProfileText}>Setting</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ProfileView} onPress={()=>{
                                if(PersonalInfo.MemberID===''){
                                    navigation.navigate('SignIn');
                                    return;
                                }
                                navigation.navigate('Transaction',{Member_ID:PersonalInfo.MemberID})}}>
                                <Image style={styles.ProfileImg} source={require('./icon/Transaction.png')}></Image>
                                <Text style={styles.ProfileText}>Transaction Record / Balance</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ProfileView} onPress={()=>{navigation.navigate('Branch');}}>
                                <Image style={styles.ProfileImg} source={require('./icon/Contact.png')}></Image>
                                <Text style={styles.ProfileText}>Contact Us</Text>
                            </TouchableOpacity>
                            {/*<TouchableOpacity style={styles.ProfileView}>*/}
                            {/*    <Image style={styles.ProfileImg}></Image>*/}
                            {/*    <Text style={styles.ProfileText}>Deposit</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity style={styles.ProfileView} onPress={()=>{
                                if(PersonalInfo.MemberID===''){
                                    navigation.navigate('SignIn')
                                }
                                else{
                                    route.params={ Name:'',Gender:'男',Member_id:'',Member_type:''};
                                    setInfoChange((!InfoChange))
                                }
                            }}>
                                <Image style={styles.ProfileImg} source={require('./icon/LogOut.png')}></Image>
                                <Text style={styles.ProfileText}>{PersonalInfo.MemberID===''?'Log In':'Log Out'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.BottomView}>
                    <TouchableOpacity style={styles.Bottom_btn} onPress={()=>{ChangePage(0);}}>
                        <Image style={styles.BottomImg} source={PageIndex===0?require('./icon/about_fill.png'):require('./icon/about_space.png')}></Image>
                        <Text style={styles.BottomText}>ABOUT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Bottom_btn} onPress={()=>{ChangePage(1);}}>
                        <Image style={styles.BottomImg} source={PageIndex===1?require('./icon/plan_fill.png'):require('./icon/plan_space.png')}></Image>
                        <Text style={styles.BottomText}>PLAN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Bottom_btn} onPress={()=>{ChangePage(2);}}>
                        <Image style={styles.BottomImg} source={PageIndex===2?require('./icon/home_fill.png'):require('./icon/home_space.png')}></Image>
                        <Text style={styles.BottomText}>HOME</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Bottom_btn} onPress={()=>{ChangePage(3);}}>
                        <Image style={styles.BottomImg} source={PageIndex===3?require('./icon/blog_fill.png'):require('./icon/blof_space.png')}></Image>
                        <Text style={styles.BottomText}>BLOG</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Bottom_btn} onPress={()=>{ChangePage(4);}}>
                        <Image style={styles.BottomImg} source={PageIndex===4?require('./icon/me_fill.png'):require('./icon/me_space.png')}></Image>
                        <Text style={styles.BottomText}>PROFILE</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
