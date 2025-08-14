import React, { useState } from "react";
import type { ContactForm } from "../types";

const Contacts: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Імітація відправки форми
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Скидаємо повідомлення про успіх через 3 секунди
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="h2 text-dark">Зв'яжіться з нами</h1>
          <p className="lead text-muted">
            Маєте питання або хочете зробити замовлення? Напишіть нам!
          </p>
        </div>
      </div>

      <div className="row g-5">
        {/* Contact Form */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="h4 text-dark mb-4">Надіслати повідомлення</h3>

              {submitSuccess && (
                <div className="alert alert-success" role="alert">
                  Дякуємо! Ваше повідомлення успішно надіслано.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-dark">
                    Ваше ім'я *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-dark">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label text-dark">
                    Повідомлення *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Надсилання...
                    </>
                  ) : (
                    "Надіслати повідомлення"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h3 className="h4 text-dark mb-4">Контактна інформація</h3>

              <div className="mb-3">
                <h5 className="h6 text-dark mb-2">📍 Адреса:</h5>
                <p className="text-muted mb-0">
                  м. Київ, вул. Хрещатик, 1<br />
                  (за попереднім записом)
                </p>
              </div>

              <div className="mb-3">
                <h5 className="h6 text-dark mb-2">📞 Телефон:</h5>
                <p className="text-muted mb-0">
                  <a href="tel:+380501234567" className="text-decoration-none">
                    +38 (050) 123-45-67
                  </a>
                </p>
              </div>

              <div className="mb-3">
                <h5 className="h6 text-dark mb-2">✉️ Email:</h5>
                <p className="text-muted mb-0">
                  <a
                    href="mailto:info@svbag.com"
                    className="text-decoration-none"
                  >
                    info@svbag.com
                  </a>
                </p>
              </div>

              <div className="mb-3">
                <h5 className="h6 text-dark mb-2">🕒 Робочі години:</h5>
                <p className="text-muted mb-0">
                  Пн-Пт: 10:00 - 18:00
                  <br />
                  Сб: 10:00 - 16:00
                  <br />
                  Нд: Вихідний
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="h4 text-dark mb-4">Ми в соціальних мережах</h3>

              <div className="d-grid gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                >
                  📷 Instagram
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                >
                  📱 Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.0!2d30.5234!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI3JzAwLjQiTiAzMMKwMzEnMjQuMyJF!5e0!3m2!1suk!2sua!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Наше розташування"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
