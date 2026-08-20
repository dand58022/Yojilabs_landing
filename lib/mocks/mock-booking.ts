import { waitForMockDelay } from "@/lib/mocks/mock-delay";
import type {
  BookingSubmissionInput,
  MockBookingDay,
  MockRequestOptions,
  MockSubmissionResult,
} from "@/types/site";

export const mockBookingAvailability = [
  {
    id: "mon",
    label: "Monday",
    weekday: 1,
    timeSlots: [
      { id: "0930", hour: 9, minute: 30 },
      { id: "1400", hour: 14, minute: 0 },
    ],
  },
  {
    id: "wed",
    label: "Wednesday",
    weekday: 3,
    timeSlots: [
      { id: "1100", hour: 11, minute: 0 },
      { id: "1530", hour: 15, minute: 30 },
    ],
  },
  {
    id: "fri",
    label: "Friday",
    weekday: 5,
    timeSlots: [
      { id: "1000", hour: 10, minute: 0 },
      { id: "1300", hour: 13, minute: 0 },
    ],
  },
].map((definition) => {
  const dayDate = getNextWeekdayDate(definition.weekday);

  return {
    id: definition.id,
    label: definition.label,
    dateLabel: formatDateLabel(dayDate),
    slots: definition.timeSlots.map((timeSlot) =>
      createBookingSlot(definition.id, dayDate, timeSlot.id, timeSlot.hour, timeSlot.minute),
    ),
  };
}) satisfies readonly MockBookingDay[];

function getNextWeekdayDate(targetWeekday: number, from = new Date()) {
  const candidate = new Date(from);
  candidate.setHours(0, 0, 0, 0);

  const daysUntil = (targetWeekday - candidate.getDay() + 7) % 7 || 7;
  candidate.setDate(candidate.getDate() + daysUntil);

  return candidate;
}

function formatDateLabel(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(value);
}

function formatTimeLabel(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function createBookingSlot(
  dayId: string,
  dayDate: Date,
  timeId: string,
  hour: number,
  minute: number,
) {
  const startsAt = new Date(dayDate);
  startsAt.setHours(hour, minute, 0, 0);

  const endsAt = new Date(startsAt);
  endsAt.setMinutes(endsAt.getMinutes() + 30);

  return {
    id: `${dayId}-${timeId}`,
    label: formatTimeLabel(startsAt),
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
  };
}

function flattenBookingSlots() {
  return mockBookingAvailability.flatMap((day) =>
    day.slots.map((slot) => ({
      dayLabel: day.label,
      dateLabel: day.dateLabel,
      slot,
    })),
  );
}

export async function submitMockBooking(
  input: BookingSubmissionInput,
  options?: MockRequestOptions,
): Promise<
  MockSubmissionResult<{
    slotId: string;
    slotLabel: string;
    dayLabel: string;
    dateLabel: string;
  } | null>
> {
  await waitForMockDelay(options?.delayMs);

  if (options?.simulate === "error") {
    return {
      state: "error",
      submissionId: null,
      message:
        "We could not confirm that slot in localhost mode. Please pick another mock slot and try again.",
      payload: null,
    };
  }

  const selected = flattenBookingSlots().find(({ slot }) => slot.id === input.slotId);

  if (!selected) {
    return {
      state: "error",
      submissionId: null,
      message: "That mock slot is no longer available in localhost mode.",
      payload: null,
    };
  }

  return {
    state: "success",
    submissionId: "booking-mock-001",
    message:
      "Your call is confirmed in mocked localhost mode. This is a local placeholder for the real scheduling integration.",
    payload: {
      slotId: selected.slot.id,
      slotLabel: selected.slot.label,
      dayLabel: selected.dayLabel,
      dateLabel: selected.dateLabel,
    },
  };
}
