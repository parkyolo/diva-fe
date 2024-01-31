package com.diva.backend.post.initializer;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class Setup {

    @Transactional
    @EventListener(ApplicationReadyEvent.class) // Application이 실행되고 나서 이 메소드를 실행한다.
    public void setUp() {
//        Optional<School> 건국대학교 = schoolRepository.findBySchoolName("건국대학교");
//
//        if (건국대학교.isEmpty()) {
//            // 건국대학교
//            School school = School.builder()
//                    .schoolName("건국대학교")
//                    .branchName("서울캠퍼스")
//                    .build();
//
//            schoolRepository.save(school);
//
//            College college = College.builder()
//                    .collegeName("건축대학")
//                    .school(school)
//                    .build();
//
//            collegeRepository.save(college);
//
//            Board 일반공지 = Board.builder()
//                    .boardName("일반공지")
//                    .boardCrawlingUrl("https://caku.konkuk.ac.kr/noticeList.do?siteId=CAKU&boardSeq=700&menuSeq=5168&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=60&pageNum=1")
//                    .boardViewUrl("https://caku.konkuk.ac.kr/noticeView.do?siteId=CAKU&boardSeq=700&menuSeq=5168&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=12&pageNum=1&seq=")
//                    .isThereNotice(true)
//                    .college(college)
//                    .build();
//
//            Board 취업_장학 = Board.builder()
//                    .boardName("취업/장학")
//                    .boardCrawlingUrl("https://caku.konkuk.ac.kr/noticeList.do?siteId=CAKU&boardSeq=701&menuSeq=5170&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=60&pageNum=1")
//                    .boardViewUrl("https://caku.konkuk.ac.kr/noticeView.do?siteId=CAKU&boardSeq=701&menuSeq=5170&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=12&pageNum=1&seq=")
//                    .isThereNotice(false)
//                    .college(college)
//                    .build();
//
//            Board 공모_특강 = Board.builder()
//                    .boardName("공모/특강")
//                    .boardCrawlingUrl("https://caku.konkuk.ac.kr/noticeList.do?siteId=CAKU&boardSeq=702&menuSeq=5172&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=60&pageNum=1")
//                    .boardViewUrl("https://caku.konkuk.ac.kr/noticeView.do?siteId=CAKU&boardSeq=702&menuSeq=5172&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=12&pageNum=1&seq=")
//                    .isThereNotice(false)
//                    .college(college)
//                    .build();
//
//            Board 학사_규정 = Board.builder()
//                    .boardName("학사규정")
//                    .boardCrawlingUrl("https://caku.konkuk.ac.kr/noticeList.do?siteId=CAKU&boardSeq=703&menuSeq=5174&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=60&pageNum=1")
//                    .boardViewUrl("https://caku.konkuk.ac.kr/noticeView.do?siteId=CAKU&boardSeq=703&menuSeq=5174&searchBy=&searchValue=&categorySeq=0&curBoardDispType=LIST&curPage=12&pageNum=1&seq=")
//                    .isThereNotice(true)
//                    .college(college)
//                    .build();
//
//            boardRepository.saveAll(
//                    List.of(일반공지, 취업_장학, 공모_특강, 학사_규정)
//            );
//        }
//
//        if (activeProfile.equals(SpringProfile.LOCAL.getProfile())) {
//            // ChaCha 정보
//            String chachaEmail = "cha3088@gmail.com";
//
//            // ChaCha 생성
//            memberRepository.save(Member.builder()
//                    .name("Cha Cha")
//                    .email(chachaEmail)
//                    .password(passwordEncoder.encode("password"))
//                    .city("city")
//                    .street("street")
//                    .zipcode("zipcode")
//                    .build());
//        }
    }
}
