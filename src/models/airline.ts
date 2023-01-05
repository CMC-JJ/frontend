// 항공사 리스트
// "result": {
//     "airlines": [
//       {
//         "id": 1,
//         "name": "대한항공",
//         "logoImageUrl": "https://blog.kakaocdn.net/dn/G1exv/btrNhgCiXez/3L04vyINyIhwH7RutKAHE1/img.png"
//       },
//       {
//         "id": 2,
//         "name": "아시아나항공",
//         "logoImageUrl": "https://mblogthumb-phinf.pstatic.net/20131030_122/jayjaewonhan_13831101361537N6oW_PNG/Asiana-Airlines-logo_%281%29.png?type=w2"
//       }
//     ]
//   }

// 항공사 서비스 리스트
// "result": {
//     "airlineServices": [
//       {
//         "id": 1,
//         "name": "공항 장애인 이동 서비스"
//       },
//       {
//         "id": 2,
//         "name": "휠체어 대여 서비스"
//       }
//     ]
//   }

export type AirlineService = {
  id: number;
  name: string;
};

// 항공사 상세 조회
// "result": {
//     "airline": {
//       "airlineId": 1,
//       "airlineName": "대한항공",
//       "customerServiceNumber": "02-2656-2001",
//       "website": "https://www.koreanair.com/kr/ko",
//       "avgReview": "4.0",
//       "availableAt": "매일 07:00 - 22:00",
//       "airlineServices": [
//         {
//           "id": 7,
//           "name": "장애인 고객",
//           "website": "https://flyasiana.com/C/KR/KO/contents/disabled-passenger"
//         },
//         {
//           "id": 8,
//           "name": "고령자 고객",
//           "website": "https://flyasiana.com/C/KR/KO/contents/elderly-passenger"
//         },
//         {
//           "id": 9,
//           "name": "임신부 고객",
//           "website": "https://flyasiana.com/C/KR/KO/contents/pregnant-passenger"
//         },
//         {
//           "id": 10,
//           "name": "유/소아 동반 고객",
//           "website": "https://flyasiana.com/C/KR/KO/contents/traveling-with-minors"
//         },
//         {
//           "id": 11,
//           "name": "혼자 여행하는 어린이/청소년",
//           "website": "https://flyasiana.com/C/KR/KO/contents/unaccompanied-minor"
//         },
//         {
//           "id": 12,
//           "name": "반려동물 동반",
//           "website": "https://flyasiana.com/C/KR/KO/contents/traveling-with-pets"
//         },
//         {
//           "id": 13,
//           "name": "의료도움이 필요한 고객",
//           "website": "https://flyasiana.com/C/KR/KO/contents/medical-assistance-guide"
//         }
//       ]
//     }
//   }

// 항공사 리뷰 리스트 조회 API
// "result": {
//     "total": 1,
//     "airlineReviews": [
//       {
//         "airlineReviewId": 3,
//         "nickName": "핀",
//         "score": "3.0",
//         "content": "좋아요",
//         "createdAt": "22.10.27",
//         "reviewedAirlineServices": [
//           "한가족 서비스",
//           "유아 동반 승객"
//         ]
//       },
//       {
//         "airlineReviewId": 1,
//         "nickName": "핀",
//         "score": "5.0",
//         "content": "좋아요",
//         "createdAt": "22.10.27",
//         "reviewedAirlineServices": [
//           "한가족 서비스",
//           "유아 동반 승객"
//         ]
//       }
//     ]
//   }
