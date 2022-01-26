import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import OnBoardingScreen from './components/onBoardingScreen';
import TourScreen from './components/tourScreen';
import SignUpAsScreen from './components/signUpAsScreen';
import LoginAsScreen from './components/loginAsScreen';
import TutorSignUpScreen from './components/tutorSignUpScreen';
import InstitutionInfoScreen from './components/InstitutionInfoScreen';
import TutorPersonalInfoScreen from './components/tutorPersonalInfoScreen';
import VerifyCodeScreen from './components/verifyCodeScreen';
// import tutorDrawerComponent from './components/tutorTabComponent';
// import TutorTabComponent from './components/tutorTabComponent';
import TutorLoginScreen from './components/tutorLoginScreen';
import AddLecturesScreen from './components/addLecturesScreen';
import AddLectureObjectiveScreen from './components/addLectureObjectiveScreen';
import CourseTargetScreen from './components/courseTargetScreen';
import FinalCourseTargetScreen from './components/finalCourseTargetScreen';
import CourseTargetScreen1 from './components/courseTargetScreen1';
import CourseOutlineScreen from './components/courseOutlineScreen';
import CoursePreviewAndThumbnailScreen from './components/coursePreviewAndThumbnailScreen';
import LectureDetailsScreen from './components/lectureDetailsScreen';
import TutorHomeScreen from './components/tutorHomeScreen';
import TutorLectureCarouselCard from './components/tutorLectureCarouselCard';
import TutorPastQuestionTitle from './components/tutorPastQuestionTitle';
import PastQuestionTargetScreen from './components/PastQuestionTargetScreen';
import PastQuestionTargetScreen1 from './components/PastQuestionTargetScreen1';
import FinalPastQuestionTargetScreen from './components/finalPastQuestionTargetScreen';
import UplaodSolutionVideoScreen from './components/uploadSolutionVideoScreen';
import UploadSolutionDocumentScreen from './components/uploadSolutionDocumentScreen';
import PastQuestionPreviewAndThumbnailScreen from './components/PastQuestionPreviewAndThumbnailScreen';
import PastQuestionDetailsScreen from './components/pastQuestionDetailsScreen';
import StudentSignUpScreen from './components/studentSignUpScreen';
import StudentInstitutionInfoScreen from './components/studentInstitutionInfoScreen';
import StudentPersonalInfoScreen from './components/studentPersonalInfoScreen';
import StudentVerifyEmailScreen from './components/studentVerifyCodeScreen';
import StudentLoginScreen from './components/studentLoginScreen';
import StudentSearchScreen from './components/studentSearchScreen';
import StudentLectureDetailsScreen from './components/studentLectureDetailsScreen';
import CollegeVideoPlayerComponent from './components/collegeVideoPlayerComponent';
import StudentLectureAccessScreen from './components/studentLectureAccessScreen';
import StudentPaymentScreen from './components/studentPaymentScreen';
import StudentCourseOutlineListScreen from './components/StudentCourseOutlineListScreen';
import StudentAnswerScreen from './components/studentAnswerScreen';
import StudentCoursesScreen from './components/studentCoursesScreen';
import StudentPastQuestionDetailsScreen from './components/studentPastQuestionDetailScreen';
import StudentPastQuestionAccessScreen from './components/studentPastQuestionAccessScreen';
import CollegePdfViewer from './components/collegePdfViewer';
import StudentPastQuestionAccessSolutionSheetScreen from './components/studentPastQuestionAccessSolutionSheetScreen';
import StudentPastQuestionScreen from './components/studentPastQuestionScreen';
import StudentPastQuestionCardComponent from './components/studentPastQuestionCardComponent';
import StudentDownloadScreen from './components/studentDownloadScreen';
import WithdrawScreen from './components/withdrawScreen';
import WithdrawFinalScreen from './components/withdrawFinalScreen';
import StudentRateScreen from './components/studentRateScreen';
import NoNetworkScreen from './components/noNetworkScreen';
import StudentPastQuestionAccessQnAScreen from './components/studentPastQuestionAccessQnAScreen';
import NoNetworkModalComponent from './components/NoNetworkModalComponent';
// import StudentAccountScreen from './components/studentAccountScreen';
import SignInAndSignUpScreen from './components/signInAndSignUpScreen';
import {brandColor} from './components/modules';
import ForgotPasswordScreen from './components/forgotPasswordScreen';
import ChangePasswordScreen from './components/changePasswordScreen';
import FocusAwareStatusBar from './components/FocuseAwareStatusBar';
// import HomeScreenSkeleton from './components/homeScreenSkeleton';
// import StudentHom
// import StudentPaymentScreen from './components/studentPaymentScreen';
// import TourScreen from './components/tourScreen';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      {/* <FocusAwareStatusBar backgroundColor={brandColor} /> */}
      <Stack.Navigator
        headerMode={false}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="OnboardingScreen">
          {(props) => <OnBoardingScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ForgotPasswordScreen">
          {(props) => <ForgotPasswordScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ChangePasswordScreen">
          {(props) => <ChangePasswordScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SignInAndSignUpScreen">
          {(props) => <SignInAndSignUpScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TourScreen">
          {(props) => <TourScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SignUpAsScreen">
          {(props) => <SignUpAsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LoginAsScreen">
          {(props) => <LoginAsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TutorSignUpScreen">
          {(props) => <TutorSignUpScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="InstitutionInfoScreen">
          {(props) => <InstitutionInfoScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TutorPersonalInfoScreen">
          {(props) => <TutorPersonalInfoScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="VerifyCodeScreen">
          {(props) => <VerifyCodeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TutorLoginScreen">
          {(props) => <TutorLoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AddLecturesScreen">
          {(props) => <AddLecturesScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AddLectureObjectiveScreen">
          {(props) => <AddLectureObjectiveScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CourseTargetScreen">
          {(props) => <CourseTargetScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="FinalCourseTargetScreen">
          {(props) => <FinalCourseTargetScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CourseTargetScreen1">
          {(props) => <CourseTargetScreen1 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CourseOutlineScreen">
          {(props) => <CourseOutlineScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CoursePreviewAndThumbnailScreen">
          {(props) => <CoursePreviewAndThumbnailScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LectureDetailsScreen">
          {(props) => <LectureDetailsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TutorHomeScreen">
          {(props) => <TutorHomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TutorLectureCarouselCard">
          {(props) => <TutorLectureCarouselCard {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TutorPastQuestionTitle">
          {(props) => <TutorPastQuestionTitle {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PastQuestionTargetScreen">
          {(props) => <PastQuestionTargetScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PastQuestionTargetScreen1">
          {(props) => <PastQuestionTargetScreen1 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="FinalPastQuestionTargetScreen">
          {(props) => <FinalPastQuestionTargetScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="UploadSolutionVideoScreen">
          {(props) => <UplaodSolutionVideoScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="UploadSolutionDocumentScreen">
          {(props) => <UploadSolutionDocumentScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PastQuestionPreviewAndThumbnailScreen">
          {(props) => <PastQuestionPreviewAndThumbnailScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PastQuestionDetailsScreen">
          {(props) => <PastQuestionDetailsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentSignUpScreen">
          {(props) => <StudentSignUpScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentInstitutionInfoScreen">
          {(props) => <StudentInstitutionInfoScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentPersonalInfoScreen">
          {(props) => <StudentPersonalInfoScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentVerifyEmailScreen">
          {(props) => <StudentVerifyEmailScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentLoginScreen">
          {(props) => <StudentLoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentSearchScreen">
          {(props) => <StudentSearchScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CollegeVideoPlayerComponent">
          {(props) => <CollegeVideoPlayerComponent {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentLectureDetailsScreen">
          {(props) => <StudentLectureDetailsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentLectureAccessScreen">
          {(props) => <StudentLectureAccessScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentPaymentScreen">
          {(props) => <StudentPaymentScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentCourseOutlineListScreen">
          {(props) => <StudentCourseOutlineListScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentAnswerScreen">
          {(props) => <StudentAnswerScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentCoursesScreen">
          {(props) => <StudentCoursesScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentPastQuestionDetailsScreen">
          {(props) => <StudentPastQuestionDetailsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentPastQuestionAccessScreen">
          {(props) => <StudentPastQuestionAccessScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CollegePdfViewer">
          {(props) => <CollegePdfViewer {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentPastQuestionAccessSolutionSheetScreen">
          {(props) => (
            <StudentPastQuestionAccessSolutionSheetScreen {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="StudentPastQuestionScreen">
          {(props) => <StudentPastQuestionScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentDownloadScreen">
          {(props) => <StudentDownloadScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="WithdrawScreen">
          {(props) => <WithdrawScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="WithdrawFinalScreen">
          {(props) => <WithdrawFinalScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentRateScreen">
          {(props) => <StudentRateScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="NoNetworkScreen">
          {(props) => <NoNetworkScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StudentPastQuestionAccessQnAScreen">
          {(props) => <StudentPastQuestionAccessQnAScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    // <NoNetworkModalComponent />
    // <VerifyCodeScreen />
    // <TutorTabComponent />
    // <TutorLoginScreen />
    // <CourseOutlineScreen />
    // <CoursePreviewAndThumbnailScreen />
    // <LectureDetailsScreen />
    // <UplaodSolutionnVideoScreen />
    // <UploadSolutionDocumentScreen />
    // <PastQuestionPreviewAndThumbnailScreen />
    // <PastQuestionDetailsScreen />
    // <StudentSearchScreen />
    // <StudentLectureDetailsScreen />
    // <CollegeVideoPlayerComponent />
    // <StudentPaymentScreen />
    // <StudentLectureAccessScreen />
    // <StudentPastQuestionAccessScreen />
    // <StudentRateScreen />
    // <SignInAndSignUpScreen />
    // <ForgotPasswordScreen />
    // <ChangePasswordScreen />
    // <HomeScreenSkeleton />
  );
};

export default App;
