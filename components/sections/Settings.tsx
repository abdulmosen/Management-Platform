
import React, { useState } from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';
import Button from '../ui/Button';
// FIX: Add .tsx extension to file path to resolve module error.
import { Bell, FileText, Users, AlertTriangle, Save } from '../icons/Icons.tsx';

type NotificationChannel = 'in-app' | 'email' | 'sms';

interface NotificationSettings {
  licenses: {
    enabled: boolean;
    reminderDays: number;
    channels: NotificationChannel[];
  };
  employees: {
    enabled: boolean;
    reminderDays: number;
    channels: NotificationChannel[];
  };
  fines: {
    enabled: boolean;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    licenses: {
      enabled: true,
      reminderDays: 30,
      channels: ['in-app'],
    },
    employees: {
      enabled: true,
      reminderDays: 30,
      channels: ['in-app', 'email'],
    },
    fines: {
      enabled: true,
    },
  });
  
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSettingChange = <T extends keyof NotificationSettings>(
    category: T,
    key: keyof NotificationSettings[T],
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
     setSaveStatus('idle');
  };

  const handleChannelChange = (
    category: 'licenses' | 'employees',
    channel: NotificationChannel,
    isChecked: boolean
  ) => {
    setSettings(prev => {
      const currentChannels = prev[category].channels;
      const newChannels = isChecked
        ? [...currentChannels, channel]
        : currentChannels.filter(c => c !== channel);
      
      return {
        ...prev,
        [category]: {
          ...prev[category],
          channels: newChannels,
        },
      };
    });
    setSaveStatus('idle');
  };
  
  const handleToggleAll = (enabled: boolean) => {
    setSettings(prev => ({
      licenses: { ...prev.licenses, enabled },
      employees: { ...prev.employees, enabled },
      fines: { ...prev.fines, enabled },
    }));
    setSaveStatus('idle');
  };

  const allEnabled = settings.licenses.enabled && settings.employees.enabled && settings.fines.enabled;


  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      console.log('Settings saved:', settings);
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const reminderOptions = [7, 15, 30, 45, 60];
  const channelOptions: { id: NotificationChannel, label: string }[] = [
    { id: 'in-app', label: 'إشعار داخل التطبيق' },
    { id: 'email', label: 'بريد إلكتروني' },
    { id: 'sms', label: 'رسالة نصية' },
  ];
  
  const SettingsCard: React.FC<{icon: React.ReactNode, title: string, description: string, children: React.ReactNode, toggleId: string, isChecked: boolean, onToggle: (checked: boolean) => void}> = 
  ({icon, title, description, children, toggleId, isChecked, onToggle}) => (
    <div className="bg-white rounded-xl shadow-sm border border-transparent">
        <div className="p-6">
             <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="text-gray-500 ml-4">{icon}</div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                </div>
                <ToggleSwitch 
                    id={toggleId}
                    checked={isChecked}
                    onChange={onToggle}
                />
            </div>
            {isChecked && (
                <div className="mt-6 pt-6 border-t border-[var(--color-border)] mr-10 space-y-4">
                    {children}
                </div>
            )}
        </div>
    </div>
  );


  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h2 className="text-2xl font-bold mb-1">إعدادات التنبيهات</h2>
            <p className="text-gray-500 mb-6">تحكم في الإشعارات التي تصلك وكيفية وصولها.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">تفعيل كل التنبيهات</h3>
                    <p className="text-sm text-gray-500">تشغيل أو إيقاف جميع أنواع الإشعارات مرة واحدة.</p>
                </div>
                <ToggleSwitch 
                    id="all-toggle"
                    checked={allEnabled}
                    onChange={handleToggleAll}
                />
            </div>
        </div>

        <div className="space-y-6">
            <SettingsCard
                icon={<FileText className="w-6 h-6"/>}
                title="تنبيهات التراخيص والتصاريح"
                description="تلقي إشعارات قبل انتهاء صلاحية التراخيص."
                toggleId="license-toggle"
                isChecked={settings.licenses.enabled}
                onToggle={(checked) => handleSettingChange('licenses', 'enabled', checked)}
            >
                <div>
                    <label htmlFor="license-days" className="block text-sm font-medium text-gray-700 mb-2">
                        تذكيري قبل
                    </label>
                    <select
                        id="license-days"
                        value={settings.licenses.reminderDays}
                        onChange={(e) => handleSettingChange('licenses', 'reminderDays', parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/3 p-2.5"
                    >
                        {reminderOptions.map(days => (
                            <option key={days} value={days}>{days} يومًا</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">إرسال التنبيه عبر</label>
                     <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {channelOptions.map(option => (
                            <div key={option.id} className="flex items-center">
                                <input
                                    id={`license-channel-${option.id}`}
                                    type="checkbox"
                                    checked={settings.licenses.channels.includes(option.id)}
                                    onChange={(e) => handleChannelChange('licenses', option.id, e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor={`license-channel-${option.id}`} className="mr-2 text-sm text-gray-900">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard
                icon={<Users className="w-6 h-6"/>}
                title="تنبيهات وثائق الموظفين"
                description="تلقي إشعارات لانتهاء الإقامات والتأمين الصحي."
                toggleId="employee-toggle"
                isChecked={settings.employees.enabled}
                onToggle={(checked) => handleSettingChange('employees', 'enabled', checked)}
            >
                <div>
                    <label htmlFor="employee-days" className="block text-sm font-medium text-gray-700 mb-2">
                        تذكيري قبل
                    </label>
                    <select
                        id="employee-days"
                        value={settings.employees.reminderDays}
                        onChange={(e) => handleSettingChange('employees', 'reminderDays', parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/3 p-2.5"
                    >
                        {reminderOptions.map(days => (
                            <option key={days} value={days}>{days} يومًا</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">إرسال التنبيه عبر</label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {channelOptions.map(option => (
                            <div key={option.id} className="flex items-center">
                                <input
                                    id={`employee-channel-${option.id}`}
                                    type="checkbox"
                                    checked={settings.employees.channels.includes(option.id)}
                                    onChange={(e) => handleChannelChange('employees', option.id, e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor={`employee-channel-${option.id}`} className="mr-2 text-sm text-gray-900">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </SettingsCard>
            
            <SettingsCard
                icon={<AlertTriangle className="w-6 h-6"/>}
                title="تنبيهات الغرامات الجديدة"
                description="تلقي إشعار فوري عند تسجيل غرامة جديدة."
                toggleId="fines-toggle"
                isChecked={settings.fines.enabled}
                onToggle={(checked) => handleSettingChange('fines', 'enabled', checked)}
            >
                <p className="text-sm text-gray-600">سيتم إرسال إشعار فوري لجميع المدراء عند تسجيل أي غرامة جديدة على النظام.</p>
            </SettingsCard>
        </div>
       <div className="flex justify-end mt-8">
            <Button onClick={handleSave} disabled={saveStatus === 'saving' || saveStatus === 'saved'}>
                <Save className="w-5 h-5 ml-2"/>
                {saveStatus === 'saving' ? 'جاري الحفظ...' : saveStatus === 'saved' ? 'تم الحفظ!' : 'حفظ التغييرات'}
            </Button>
        </div>
    </div>
  );
};

export default Settings;