import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CourseItemComponent } from './student-manager/course-item/course-item.component';
import { DetailCourseComponent } from './student-manager/detail-course/detail-course.component';
import { ItemDetailCourseComponent } from './student-manager/detail-course/item-detail-course/item-detail-course.component';
import { StudentManagerComponent } from './student-manager/student-manager.component';
import { ItemManageComponent } from './teacher-manager/item-manage/item-manage.component';
import { PointManageComponent } from './teacher-manager/point-manage/point-manage.component';
import { TeacherManagerComponent } from './teacher-manager/teacher-manager.component';
import { ItemTopicImageComponent } from './teacher-manager/topic-manage/item-topic-image/item-topic-image.component';
import { ItemTopicComponent } from './teacher-manager/topic-manage/item-topic/item-topic.component';
import { TopicManageComponent } from './teacher-manager/topic-manage/topic-manage.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DetailTopicComponent } from './teacher-manager/topic-manage/detail-topic/detail-topic.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopBarComponent,
    FooterComponent,
    TeacherManagerComponent,
    StudentManagerComponent,
    CourseItemComponent,
    PointManageComponent,
    ItemManageComponent,
    TopicManageComponent,
    ItemTopicImageComponent,
    ItemTopicComponent,
    DetailCourseComponent,
    ItemDetailCourseComponent,
    DetailTopicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'teacher', component: TeacherManagerComponent },
      { path: 'student', component: StudentManagerComponent },
      { path: 'point-manage', component: PointManageComponent },
      { path: 'topic-manage', component: TopicManageComponent },
      { path: 'detail-course/:courseId/:classId', component: DetailCourseComponent },
      { path: 'detail-topic/:topicId', component: DetailTopicComponent },
    ]),
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
