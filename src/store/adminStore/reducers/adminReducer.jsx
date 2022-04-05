import { SET_CURRENT_ADMIN, SET_EDITE_EVENT, SET_EVENTS } from "../events/eventActions";
import { SET_EDITE_TYPE, SET_TYPES } from "../types/typesActions";
import { SET_USERS } from "../users/usersActions";

const initialState = {

    currentAdmin: null,
    eventsList: null,
    eventsListCount: 0,
    editeEvent: null,
    userList: null,
    usersListCount: 0,
    typeList: null,
    typeListCount: 0,
    editeType: null,
    reportList: [
      {
        id: 1,
        type: 'comments',
        date: '02/03/22',
        text: [
          {
            en: 'Nudity or sexual activity',
            ru: 'Изображение обнаженного тела или действие сексуального характера',
          },
          {
            en: 'Hostile language or symbols',
            ru: 'Враждебные высказывание или символы',
          },
          {
            en: 'Violence or dangerous organizations',
            ru: 'Насилие или опасные организации',
          },
        ]
      },
      {
        id: 2,
        type: 'users',
        date: '02/03/22',
        text: [
          {
            en: 'asassssssssssssssssssssssssssssssss or sexual activity',
            ru: 'Изображение обнаженного тела или действие сексуального характера',
          },
          {
            en: 'Hostile language or symbols',
            ru: 'Враждебные высказывание или символы',
          },
          {
            en: 'Violence or dangerous organizations',
            ru: 'Насилие или опасные организации',
          }
        ]
      },
      {
        id: 3,
        type: 'events',
        date: '02/03/22',
        text: [
          {
            en: 'Nudity or sexual activity',
            ru: 'Изображение обнаженного тела или действие сексуального характера',
          },
          {
            en: 'Hostile language or symbols',
            ru: 'Враждебные высказывание или символы',
          },
          {
            en: 'Violence or dangerous organizations',
            ru: 'Насилие или опасные организации',
          }
        ]
      },
    ],
    reportUsers: [
      {
        id: 1,
        report: 'sdfsdg',
        date: '02/03/22',
        comment: 'sdfg',
      },
      {
        id: 2,
        report: 'sdfsdg',
        date: '02/03/22',
        comment: 'sdfghjgfdsfg',
      },
      {
        id: 3,
        report: 'sdfsdg',
        date: '02/03/22',
        comment: 'sdfghjgfdsfg',
      },
    ],
    reportEvents: [
      {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU',
        date: '02/03/22',
        report: 'dfssvverdv',
        description: 'fsdredfv',
        title: 'sdfgxc',
        location: 'sfddgbfg',

      },
      {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU',
        date: '02/03/22',
        report: 'dfssvverdv',
        description: 'fsdredfv',
        title: 'sdfgxc',
        location: 'sfddgbfg',

      },
      {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU',
        date: '02/03/22',
        report: 'dfssvverdv',
        description: 'fsdredfv',
        title: 'sdfgxc',
        location: 'sfddgbfg',

      },
    ],
    reportComments: [
      {
        id: 1,
        report: 'Нарушение прав на интеллектуальную собственность',
        comment: 'dsfgvds',
        date: '03/03/22',
      },
      {
        id: 2,
        report: 'Нарушение прав на интеллектуальную собственность',
        comment: null,
        date: '03/03/22',
      },
      {
        id: 3,
        report: 'Нарушение прав на интеллектуальную собственность',
        comment: null,
        date: '03/03/22',
      }
    ],
}

export const adminReducer = (state = initialState, action) =>{
    switch(action.type){

        case SET_CURRENT_ADMIN:
            return {
                ...state,
                currentAdmin: action.payload
            }

        case SET_EVENTS:
            return {
                ...state,
                eventsList: action.payload.eventList,
                eventsListCount: action.payload.dataCount
            }
          
        case SET_EDITE_EVENT:
            return {
                ...state,
                editeEvent: action.payload
            }

        case SET_USERS:
            return {
                ...state,
                userList: action.payload.list,
                usersListCount: action.payload.dataCount
            }

        case SET_TYPES:
            return {
                ...state,
                typeList: action.payload.types,
                typeListCount: action.payload.dataCount
            }

        case SET_EDITE_TYPE:
            return {
                ...state,
                editeType: action.payload
            }        

        default:
            return state;
    }
}

