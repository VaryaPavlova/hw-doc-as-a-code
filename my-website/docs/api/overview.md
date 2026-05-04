---
title: API Reference
sidebar_position: 1
description: Интерактивная документация REST API платформы Карьерный навигатор
---

# API Reference

Интерактивная документация API платформы Карьерный навигатор доступна по ссылке: [**Открыть API Reference**](/hw-doc-as-a-code/docs/api/reference).

---

## Базовый URL

```
https://api.CareerMap.com/api/v1
```

## Аутентификация

> **Шаблон раздела.** Описание схемы аутентификации добавляется при реализации.

Предполагается использование Bearer-токена в заголовке `Authorization`:

```http
Authorization: Bearer <token>
```

---

## Эндпоинты

### Специализации

| Метод | Путь | Описание |
|---|---|---|
| `GET` | `/specializations` | Получить список всех специализаций |
| `GET` | `/specializations/{specialization_id}/info` | Получить полную информацию о специализации |
| `GET` | `/specializations/{specialization_id}/materials` | Получить список материалов специализации |
| `GET` | `/specializations/{specialization_id}/materials/{material_id}` | Получить детали конкретного материала |

### Прогресс

| Метод | Путь | Описание |
|---|---|---|
| `POST` | `/materials/{material_id}/rate` | Оценить материал (1–5) |
| `POST` | `/materials/{material_id}/complete` | Отметить материал как пройденный |

---

## Схемы данных

### Specialization

| Поле | Тип | Описание |
|---|---|---|
| `id` | integer | Уникальный идентификатор |
| `name` | string | Название специализации |
| `short_description` | string | Краткое описание для карточки |
| `icon_url` | string | URL иконки |
| `category` | enum | `marketing` / `analytics` / `management` / `design` |

### MaterialSummary

| Поле | Тип | Описание |
|---|---|---|
| `id` | integer | Уникальный идентификатор |
| `title` | string | Название материала |
| `type` | enum | `video` / `article` / `quiz` |
| `order_index` | integer | Порядок в специализации |

### MaterialDetail

Расширяет `MaterialSummary`, дополнительно содержит:

| Поле | Тип | Описание |
|---|---|---|
| `content` | string | Учебный контент (текст / markdown) |
| `video_url` | string \| null | Ссылка на видео-лекцию |
| `resources` | string[] | Дополнительные материалы (ссылки, PDF) |
| `user_progress.completed` | boolean | Пройден ли материал пользователем |

---

## Коды ошибок

| HTTP-код | Значение | Когда возникает |
|---|---|---|
| `200` | OK | Успешный ответ |
| `404` | Not Found | Специализация или материал не найдены |
| `500` | Internal Server Error | Внутренняя ошибка сервера |
