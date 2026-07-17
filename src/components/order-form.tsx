"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

type OrderValues = {
  name: string;
  phone: string;
  items: string;
  time: string;
  note?: string;
};

export function OrderForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderValues>();

  const onSubmit = async (data: OrderValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.info("order", data);
    setSent(true);
    reset();
  };

  return (
    <section id="order" className="section bg-[var(--bg-elevated)]">
      <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
            Онлайн-заказ
          </p>
          <h2 className="section-title mt-2">Соберите заказ заранее</h2>
          <p className="section-lead">
            Укажите напитки и время — бариста приготовит к вашему приходу. Оплата
            на кассе или по СБП.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-[var(--fg-muted)]">
            <li>• Готовность обычно 10–15 минут</li>
            <li>• Можно указать «с собой» или «в зале»</li>
            <li>• Растительное молоко — без доплаты за овсяное</li>
          </ul>
        </div>

        <div className="card p-5 sm:p-7">
          {sent ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-3 text-coffee" size={40} />
              <p className="font-display text-2xl font-semibold">Заказ принят</p>
              <p className="mt-2 max-w-xs text-sm text-[var(--fg-muted)]">
                Мы свяжемся для подтверждения. Можно оформить ещё один заказ.
              </p>
              <Button className="mt-6" onClick={() => setSent(false)}>
                Новый заказ
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label className="label" htmlFor="order-name">
                  Имя
                </label>
                <input
                  id="order-name"
                  className="input"
                  autoComplete="name"
                  {...register("name", { required: "Укажите имя" })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-amber" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label" htmlFor="order-phone">
                  Телефон
                </label>
                <input
                  id="order-phone"
                  className="input"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+7"
                  {...register("phone", { required: "Укажите телефон" })}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-amber" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label" htmlFor="order-items">
                  Что заказать
                </label>
                <textarea
                  id="order-items"
                  className="input min-h-[96px] resize-y"
                  placeholder="2 капучино, 1 фильтр, круассан"
                  {...register("items", { required: "Опишите заказ" })}
                />
                {errors.items && (
                  <p className="mt-1 text-xs text-amber" role="alert">
                    {errors.items.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label" htmlFor="order-time">
                  Время готовности
                </label>
                <input
                  id="order-time"
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
                <label className="label" htmlFor="order-note">
                  Комментарий
                </label>
                <input
                  id="order-note"
                  className="input"
                  placeholder="С собой / овсяное молоко"
                  {...register("note")}
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Отправляем…" : "Отправить заказ"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
