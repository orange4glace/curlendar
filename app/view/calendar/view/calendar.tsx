import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { IVisitService } from '../../../model/visit/visit-service';
import { View, Text } from 'native-base';

import * as styles from './calendar.scss';
import { StyleSheet, Dimensions } from 'react-native';

interface CalendarMonthViewProps {
  visitService: IVisitService;
  year: number;
  month: number;
}

class _CalendarView extends React.Component<CalendarMonthViewProps, {}> {

  constructor(props: CalendarMonthViewProps) {
    super(props);
  }

  render() {
    const maxDaysInMonth = new Date(this.props.year, this.props.month, 0).getDate();
    const maxDaysInPrevMonth = new Date(this.props.year, this.props.month - 1, 0).getDate();
    const firstDayInMonth = new Date(this.props.year, this.props.month - 1, 1).getDay();
    const daysInMonth = [];
    for (let i = maxDaysInPrevMonth - firstDayInMonth; i < maxDaysInPrevMonth; i ++) daysInMonth.push({
      month: this.props.month - 1,
      day: i + 1
    });
    for (let i = 0; i < maxDaysInMonth; i ++) daysInMonth.push({
      month: this.props.month,
      day: i + 1
    });
    const d = daysInMonth.length;
    if (d % 7)
      for (let i = 0; i < 7 - d % 7; i ++) daysInMonth.push({
        month: this.props.month + 1,
        day: i + 1,
      });
    const calendarHeight = Dimensions.get('window').height * 0.7;
    const dayLabelHeight = 30;
    const dayLabelContainerViewStyle = {
      ...styles['day-label-container'],
      height: dayLabelHeight,
    }
    console.log(MonthStyle)
    return (
      <View style={{
        ...styles.month,
        height: calendarHeight}}>
        <>
          <View style={dayLabelContainerViewStyle}><Text style={styles['day-label']}>일</Text></View>
          <View style={dayLabelContainerViewStyle}><Text style={styles['day-label']}>월</Text></View>
          <View style={dayLabelContainerViewStyle}><Text style={styles['day-label']}>화</Text></View>
          <View style={dayLabelContainerViewStyle}><Text style={styles['day-label']}>수</Text></View>
          <View style={dayLabelContainerViewStyle}><Text style={styles['day-label']}>목</Text></View>
          <View style={dayLabelContainerViewStyle}><Text style={styles['day-label']}>금</Text></View>
          <View style={dayLabelContainerViewStyle}><Text style={styles['day-label']}>토</Text></View>
        </>
        {daysInMonth.map((day, index) => {
          const dayViewStyle: any = {
            borderColor: 'red',
            width: '14.28571428571429%',
            height: (calendarHeight - dayLabelHeight) / ((daysInMonth.length) / 7),
            borderLeftWidth: 1,
            borderBottomWidth: 1
          };
          if (index % 7 == 6) // RightMost
            dayViewStyle['borderRightWidth'] = 1;
          if (Math.floor(index / 7) == 0) // TopMost
            dayViewStyle['borderTopWidth'] = 1;
          return (
          <View key={day.month + '-' + day.day} style={dayViewStyle}>
            <CalendarDayView {...this.props} day={day.day}/>
          </View>)
        })}
      </View>
    )
  }

}
export const CalendarView = observer(_CalendarView);

const MonthStyle = StyleSheet.create({
  'day-container': {
    backgroundColor: 'grey'
  },
  'day-container:last-child': {
    backgroundColor: 'white',
  }
})

interface CalendarDayViewProps extends CalendarMonthViewProps {
  day: number;
}

class _CalendarDayView extends React.Component<CalendarDayViewProps, {}> {

  render() {
    const style = {
      ...styles.day,
      height: 50
    };
    return (
      <View style={style}>
        <Text>{this.props.day}데이</Text>
      </View>
    )
  }

}
const CalendarDayView = observer(_CalendarDayView);