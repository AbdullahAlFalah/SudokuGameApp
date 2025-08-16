import { useEffect, useRef } from 'react';
import { InteractionManager } from 'react-native';

import ensureExactAlarmPermission from '../utils/exactAlarmPermission';
import checkBackgroundRestrictions from '../utils/BatteryModeRequest';
import checkPowerManagementRestrictions from '../utils/PowerManagerSettings';
import { scheduleNotification } from '../services/NotifyService';

const runScheduleNotification = async (): Promise<boolean> => {
    try {
        await scheduleNotification(); // may have internal permission logic
        return true;
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

                const steps: Array<{ name: string; run: () => Promise<boolean> }> = [
                { name: 'Exact Alarm Permission', run: ensureExactAlarmPermission },
                { name: 'Background Restrictions', run: checkBackgroundRestrictions },
                { name: 'Power Management', run: checkPowerManagementRestrictions },
                { name: 'Schedule Notification', run: runScheduleNotification },
                ];

                for (const step of steps) {
                if (cancelled) { return; }
                const result = await step.run();
                console.log(`[Step] ${step.name}: ${result ? 'OK' : 'FAILED'}`);
                if (!result) {
                    console.warn(`[Stop] ${step.name} not satisfied — aborting chain.`);
                    return;
                }
                console.log(`[Step] ${step.name} completed`);
                }

                console.log('✅ Notification scheduled successfully.');
            } catch (err) {
                console.error('❌ Error in sequential permission flow:', err);
            }
        };

        InteractionManager.runAfterInteractions(run);

        return () => {
            cancelled = true;
        };

    }, []);

}
