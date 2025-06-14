import { useState } from 'react';

interface SystemSetting {
  id: string;
  name: string;
  description: string;
  value: boolean;
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([
    {
      id: 'email-notifications',
      name: 'Email Notifications',
      description: 'Send email notifications for new student registrations and important updates',
      value: true
    },
    {
      id: 'auto-approve',
      name: 'Auto-approve Students',
      description: 'Automatically approve new student registrations',
      value: false
    },
    {
      id: 'maintenance-mode',
      name: 'Maintenance Mode',
      description: 'Enable maintenance mode to restrict access to the platform',
      value: false
    },
    {
      id: 'debug-mode',
      name: 'Debug Mode',
      description: 'Enable debug mode for development and troubleshooting',
      value: false
    }
  ]);

  const handleSettingChange = (settingId: string) => {
    setSettings(settings.map(setting => 
      setting.id === settingId 
        ? { ...setting, value: !setting.value }
        : setting
    ));
  };

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          System Settings
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Configure system-wide settings and preferences.
        </p>
      </div>

      <div className="mt-6">
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {setting.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {setting.description}
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="flex items-center h-5">
                    <input
                      id={setting.id}
                      name={setting.id}
                      type="checkbox"
                      checked={setting.value}
                      onChange={() => handleSettingChange(setting.id)}
                      className="focus:ring-gold-500 h-4 w-4 text-gold-600 border-gray-300 rounded"
                    />
                    <label htmlFor={setting.id} className="ml-3 text-sm text-gray-700">
                      {setting.value ? 'Enabled' : 'Disabled'}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                System Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Current system status and version information.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Version</dt>
                  <dd className="mt-1 text-sm text-gray-900">1.0.0</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">2024-03-20</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Environment</dt>
                  <dd className="mt-1 text-sm text-gray-900">Production</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Database Status</dt>
                  <dd className="mt-1 text-sm text-green-600">Connected</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 