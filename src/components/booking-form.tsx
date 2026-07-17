"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

type BookingValues = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  note?: string;
};

export function BookingForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    defaultValues: { guests: "2" },
  });

  const onSubmit = async (data: BookingValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.info("booking", data);
    setSent(true);
    reset({ guests: "2" });
  };

  return (
    <section id="booking" className="section">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
              Бронирование
            </p>
            <h2 className="section-title mt-2">Стол без спешки</h2>
            <p className="section-lead mx-auto">
              Забронируйте место у окна или тихий угол для работы.
            </p>
          </div>

          <div className="card glass p-5 sm:p-8">
            {sent ? (
              <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="mb-3 text-coffee" size={40} />
                <p className="font-display text-2xl font-semibold">Заявка отправлена</p>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">
                  Подтвердим бронь в течение часа в рабочее время.
                </p>
                <Button className="mt-6" onClick={() => setSent(false)}>
                  Забронировать ещё
                </Button>
              </div>
            ) : (
              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <label className="label" htmlFor="book-name">
                    Имя
                  </label>
                  <input
                    id="book-name"
                    className="input"
                    {...register("name", { required: "Укажите имя" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-amber" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label" htmlFor="book-phone">
                    Телефон
                  </label>
                  <input
                    id="book-phone"
                    className="input"
                    type="tel"
                    {...register("phone", { required: "Укажите телефон" })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-amber" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label" htmlFor="book-date">
                    Дата
                  </label>
                  <input
                    id="book-date"
                    className="input"
                    type="date"
                    {...register("date", { required: "Выберите дату" })}
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-amber" role="alert">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label" htmlFor="book-time">
                    Время
                  </label>
                  <input
                    id="book-time"
                    className="input"
                    type="time"
                    {...register("time", { required: "Выберите время" })}
                  />
                  {errors.time && (
                    <p className="mt-1 text-xs text-amber" role="alert">
                      {errors.time.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label" htmlFor="book-guests">
                    Гостей
                  </label>
                  <select id="book-guests" className="input" {...register("guests")}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3–4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="book-note">
                    Пожелания
                  </label>
                  <input
                    id="book-note"
                    className="input"
                    placeholder="У окна, розетка…"
                    {...register("note")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Отправляем…" : "Забронировать стол"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
