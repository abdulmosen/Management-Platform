import React, { useState, useMemo, FC } from 'react';
// FIX: Add .tsx extension to file path to resolve module error.
import { ChevronLeft, ChevronRight } from '../icons/Icons.tsx';

interface DatePickerProps {
    selectedDate: string; // YYYY-MM-DD
    onSelectDate: (date: string) => void;
    onClose: () => void;
}

const DatePicker: FC<DatePickerProps> = ({ selectedDate, onSelectDate, onClose }) => {
    const getInitialDate = () => {
        if (selectedDate) {
            const [year, month, day] = selectedDate.split('-').map(Number);
            return new Date(Date.UTC(year, month - 1, day));
        }
        const today = new Date();
        return new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    };

    const [viewDate, setViewDate] = useState(getInitialDate());

    const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const dayNames = ['أحد', 'إث', 'ثلث', 'أرب', 'خم', 'جم', 'سبت'];

    const { year, month } = useMemo(() => ({
        year: viewDate.getUTCFullYear(),
        month: viewDate.getUTCMonth(),
    }), [viewDate]);

    const daysInMonth = useMemo(() => {
        const date = new Date(Date.UTC(year, month, 1));
        const days = [];
        const firstDayIndex = date.getUTCDay(); // 0 for Sunday
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(null);
        }
        while (date.getUTCMonth() === month) {
            days.push(new Date(date));
            date.setUTCDate(date.getUTCDate() + 1);
        }
        return days;
    }, [year, month]);

    const handlePrevMonth = () => {
        setViewDate(new Date(Date.UTC(year, month - 1, 1)));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(Date.UTC(year, month + 1, 1)));
    };

    const handleDateClick = (day: Date) => {
        const dateString = day.toISOString().split('T')[0];
        onSelectDate(dateString);
    };

    const selectedTime = useMemo(() => {
        if (!selectedDate) return null;
        const [y, m, d] = selectedDate.split('-').map(Number);
        return new Date(Date.UTC(y, m - 1, d)).getTime();
    }, [selectedDate]);

    const todayTime = useMemo(() => {
        const today = new Date();
        return new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())).getTime();
    }, []);

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 w-72">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight className="w-5 h-5" /></button>
                    <div className="font-bold">{monthNames[month]} {year}</div>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-7 gap-y-1 text-center">
                    {dayNames.map(day => <div key={day} className="text-xs font-semibold text-gray-500 p-1">{day}</div>)}
                    {daysInMonth.map((day, index) => {
                        if (!day) return <div key={`empty-${index}`}></div>;
                        
                        const dayTime = day.getTime();
                        const isSelected = selectedTime === dayTime;
                        const isToday = todayTime === dayTime;

                        return (
                            <button 
                                key={index} 
                                onClick={() => handleDateClick(day)}
                                className={`p-1 rounded-full w-9 h-9 mx-auto flex items-center justify-center text-sm
                                    ${isSelected ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-gray-100'}
                                    ${!isSelected && isToday ? 'text-blue-600 font-bold' : ''}
                                `}
                            >
                                {day.getUTCDate()}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default DatePicker;