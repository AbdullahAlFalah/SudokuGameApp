import { useEffect, useRef } from 'react';
import { InteractionManager } from 'react-native';
import notifee from '@notifee/react-native';

import ensureExactAlarmPermission from '../utils/exactAlarmPermission';
import checkBackgroundRestrictions from '../utils/BatteryModeRequest';
// import checkPowerManagementRestrictions from '../utils/PowerManagerSettings';
import { scheduleNotification } from '../services/NotifyService';

const runScheduleNotification = async (): Promise<boolean> => {
    try {
        await scheduleNotification(); // may have internal permission logic
        return true; // treat void as success
    } catch (err) {
        console.error('Inner error:', err);
        return false;
    }
};

export default function UseScheduledPermissionsAndNotification() {
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) { return; } // avoid double-run in StrictMode
        startedRef.current = true;

        let cancelled = false;

        const run = async () => {
            try {
                // Cancel any already displayed notifications
                await notifee.cancelDisplayedNotifications();

                // 2-second delay before starting
                await new Promise((res) => setTimeout(res, 2000));

                const steps: Array<{ name: string; run: () => Promise<boolean>; soft?: boolean }> = [
                    { name: 'Exact Alarm Permission', run: ensureExactAlarmPermission },
                    { name: 'Background Restrictions', run: checkBackgroundRestrictions },
                    // { name: 'Power Management', run: checkPowerManagementRestrictions, soft:true }, // soft check
                    { name: 'Schedule Notification', run: runScheduleNotification },
                ];

                for (const step of steps) {
                    if (cancelled) { return; }

                    let result: boolean;
                    try {
                        result = await step.run(); // Await user action + recheck inside each function
                    } catch (err) {
                        console.error(`[Error] ${step.name} threw an error:`, err);
                        result = false;
                    }
                    if (result) {
                        console.log(`[Step] ${step.name}: OK`);
                    } else if (step.soft) {
                        console.warn(`[SoftStop] ${step.name} not satisfied... continuing anyway.`);
                    } else {
                        console.warn(`[Stop] ${step.name} not satisfied... aborting chain.`);
                        return;
                    }
                    console.log(`[Step] ${step.name} completed`);
                }

                console.log('Notification scheduled successfully.');
            } catch (err) {
                console.error('Error in sequential permission flow:', err);
            }
        };

        InteractionManager.runAfterInteractions(run);

        return () => {
            cancelled = true;
        };

    }, []);

}
