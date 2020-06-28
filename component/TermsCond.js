import React from 'react'
import { SafeAreaView, Image, TextInput,TouchableOpacity, Text, ActivityIndicator, StyleSheet, ImageBackground, ScrollView} from 'react-native'
import Constants from 'expo-constants'

class TermsCond extends React.Component{
render (){
return (

<SafeAreaView style={styles.container}>
<ImageBackground style={{flex: 1, resizeMode: "cover"}} source={require('../assets/back1.png')}>
<ScrollView style={styles.scrollview}>

    <TouchableOpacity style={{marginTop: 20}} onPress={()=>this.props.navigation.goBack()}><Image style={styles.image} source={require('../assets/backicon.png')}/>
    </TouchableOpacity> 
    <Text style={styles.text1}>Terms and Conditions</Text>
    <Text style={styles.textb}>
    These terms and conditions ("Terms", "Agreement") are an agreement between Mobile Application Developer ("Mobile Application Developer", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of the Schedule Buzzers mobile application and any of its products or services (collectively, "Mobile Application" or "Services").
    </Text>
    <Text style={styles.texta}>Accounts and membership</Text>
    <Text style={styles.textb}>If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.
    </Text>
    <Text style={styles.texta}>User content</Text>
    <Text style={styles.textb}>We do not own any data, information or material ("Content") that you submit in the Mobile Application in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may, but have no obligation to, monitor and review Content in the Mobile Application submitted or created using our Services by you. Unless specifically permitted by you, your use of the Mobile Application does not grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose. But you grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable.
    </Text>
    <Text style={styles.texta}>Backups</Text>
    <Text style={styles.textb}>We are not responsible for Content residing in the Mobile Application. In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain appropriate backup of your Content. Notwithstanding the foregoing, on some occasions and in certain circumstances, with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.
    </Text>
    <Text style={styles.texta}>Links to other mobile applications</Text>
    <Text style={styles.textb}>Although this Mobile Application may link to other mobile applications, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked mobile application, unless specifically stated herein. Some of the links in the Mobile Application may be "affiliate links". This means if you click on the link and purchase an item, Mobile Application Developer will receive an affiliate commission. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their mobile applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any mobile application which you access through a link from this Mobile Application. Your linking to any other off-site mobile applications is at your own risk.
    </Text>
    <Text style={styles.texta}>Intellectual property rights</Text>
    <Text style={styles.textb}>This Agreement does not transfer to you any intellectual property owned by Mobile Application Developer or third-parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Mobile Application Developer. All trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services, are trademarks or registered trademarks of Mobile Application Developer or Mobile Application Developer licensors. Other trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services may be the trademarks of other third-parties. Your use of our Mobile Application and Services grants you no right or license to reproduce or otherwise use any Mobile Application Developer or third-party trademarks.
    </Text>
    <Text style={styles.texta}>Limitation of liability</Text>
    <Text style={styles.textb}>To the fullest extent permitted by applicable law, in no event will Mobile Application Developer, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Mobile Application Developer has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Mobile Application Developer and its affiliates, officers, employees, agents, suppliers and licensors, relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to Mobile Application Developer for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.
    </Text>
    <Text style={styles.texta}>Indemnification</Text>
    <Text style={styles.textb}>You agree to indemnify and hold Mobile Application Developer and its affiliates, directors, officers, employees, and agents harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Mobile Application or Services or any willful misconduct on your part.
    </Text>
    <Text style={styles.texta}>Dispute resolution</Text>
    <Text style={styles.textb}>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Singapore without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Singapore. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Singapore, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.
    </Text>
    <Text style={styles.texta}>Changes and amendments</Text>
    <Text style={styles.textb}>We reserve the right to modify this Agreement or its policies relating to the Mobile Application or Services at any time, effective upon posting of an updated version of this Agreement in the Mobile Application. When we do, we will post a notification in our Mobile Application. Continued use of the Mobile Application after any such changes shall constitute your consent to such changes. Policy was created with WebsitePolicies.
    </Text>
    <Text style={styles.texta}>Acceptance of these terms</Text>
    <Text style={styles.textb}>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Mobile Application or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Mobile Application and its Services.
    </Text>
    <Text style={styles.texta}>Contacting us</Text>
    <Text style={styles.textb}>If you would like to contact us to understand more about this Agreement or wish to contact us concerning any matter relating to it, you may send an email to schedulebuzzers@gmail.com
    </Text>
    <Text style={styles.textb}>This document was last updated on June 7, 2020</Text> 
</ScrollView>
</ImageBackground>   
</SafeAreaView>
)
}
}

const styles = StyleSheet.create({
    container: { marginTop: Constants.statusBarHeight,
        flex: 1,
        //flexDirection: 'column',
        backgroundColor: '#02b7cc',
      },

      image: {
        //color: "black",
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        height: 60,
        width:60,
        marginLeft:15
    },
      text1 :{
        fontSize: 28,
        fontWeight:"bold",
        alignSelf:'center',
        marginTop:10,
        textDecorationLine:"underline",
        justifyContent: 'center',
        marginBottom:10

      },
      texta:{
        fontSize: 20,
        marginTop: 20,
        marginLeft: 10,
        //alignSelf: "center",
        //color: "white",
        fontWeight:"bold",
      },
      textb:{
        fontSize: 16,
        marginTop: 5,
        marginLeft: 10,
        //alignSelf: "center",
        //color: "white"
      }


})

export default TermsCond
