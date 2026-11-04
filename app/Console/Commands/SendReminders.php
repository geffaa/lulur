<?php

namespace App\Console\Commands;

use App\Services\ReminderService;
use Illuminate\Console\Command;

class SendReminders extends Command
{
    protected $signature = 'lulur:send-reminders';

    protected $description = 'Send due WhatsApp/email confirmations and reminders (WhatsApp simulated)';

    public function handle(ReminderService $reminders): int
    {
        $count = $reminders->dispatchDue();
        $this->info("Processed $count reminders.");

        return self::SUCCESS;
    }
}
