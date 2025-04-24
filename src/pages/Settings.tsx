// src/pages/Settings.tsx
import { useState } from 'react';
import { useAuth } from '../components/auth/useAuth';

const Settings: React.FC = () => {
    const { user } = useAuth();
    const [saved, setSaved] = useState(false);

    // Placeholder state for settings
    const [settings, setSettings] = useState({
        emailNotifications: true,
        darkMode: false,
        showHints: true
    });

    const handleToggle = (setting: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would save these settings to your backend
        // For now, just show a success message
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!user) {
        return (
            <div className="text-center p-8">
                <p>Please log in to access settings.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Account Settings
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Manage your preferences and account settings.
                    </p>
                </div>

                {/* Success message */}
                {saved && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 m-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">
                                    Your settings have been saved successfully.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSave}>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email Notifications</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input
                                            type="checkbox"
                                            id="emailNotifications"
                                            checked={settings.emailNotifications}
                                            onChange={() => handleToggle('emailNotifications')}
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label
                                            htmlFor="emailNotifications"
                                            className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        ></label>
                                    </div>
                                    <label htmlFor="emailNotifications" className="text-sm text-gray-700">
                                        Receive email notifications about your progress and new features
                                    </label>
                                </dd>
                            </div>

                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Dark Mode</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input
                                            type="checkbox"
                                            id="darkMode"
                                            checked={settings.darkMode}
                                            onChange={() => handleToggle('darkMode')}
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label
                                            htmlFor="darkMode"
                                            className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        ></label>
                                    </div>
                                    <label htmlFor="darkMode" className="text-sm text-gray-700">
                                        Use dark mode for the application interface
                                    </label>
                                </dd>
                            </div>

                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Show Hints</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input
                                            type="checkbox"
                                            id="showHints"
                                            checked={settings.showHints}
                                            onChange={() => handleToggle('showHints')}
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label
                                            htmlFor="showHints"
                                            className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.showHints ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        ></label>
                                    </div>
                                    <label htmlFor="showHints" className="text-sm text-gray-700">
                                        Show helpful hints and tips during guitar games
                                    </label>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>

            <style>
            {`
                .toggle-checkbox:checked {
                  right: 0;
                  border-color: #68D391;
                }
                .toggle-label {
                  transition: background-color 0.2s ease;
                }
            `}
            </style>
        </div>
    );
};

export default Settings;