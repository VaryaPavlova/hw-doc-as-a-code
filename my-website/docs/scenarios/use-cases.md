---
title: Пользовательские сценарии
sidebar_position: 1
description: Use case диаграммы и sequence-диаграммы платформы Карьерный навигатор
---

# Пользовательские сценарии

## Диаграмма прецедентов (Use Case)

Диаграмма описывает взаимодействие трёх ролей с функциями системы: **User** (пользователь), **Expert** (эксперт) и **Author** (автор контента).

```plantuml
@startuml

actor user as u
actor expert as e
actor author as a

package "Карьерная карта" {
  usecase "Зайти в карьерную карту" as UC1
  usecase "Выбрать уровень" as UC2
  usecase "Выбрать специализацию" as UC3
  usecase "Выбрать навык для обучения" as UC4
  usecase "Изучить материалы" as UC5
  usecase "Оценить урок" as UC40
  usecase "Задать вопрос по теме" as UC41
  usecase "Отметить материал пройденным" as UC42
  package "Домашнее задание" {
    usecase "Решить домашнее задание" as UC6
    usecase "Отправить ДЗ на проверку" as UC7
    package "Проверить ДЗ" {
      usecase "Открыть список ДЗ" as UC8
      usecase "Выбрать фильтры" as UC9
      usecase "Выбрать ДЗ для проверки" as UC14
      usecase "Выставить балл" as UC15
      usecase "Оставить комментарий" as UC16
    }
  }
}

u --> UC1
UC1 ..> UC2: include
UC2 ..> UC3: include
UC3 ..> UC4: include
UC4 <.. UC5: extend
UC5 <.. UC6: extend
UC6 <.. UC7: extend
UC4 <.. UC40: extend
UC4 <.. UC41: extend
UC4 <.. UC42: extend

e <|-left- a
e --> UC8
UC8 <.. UC9: extend
UC8 <.. UC14: extend
UC14 <.. UC15: extend
UC15 <.. UC16: extend

package "Добавить материал" {
  usecase "Открыть страницу редактирования" as UC17
  usecase "Выбрать уровень/специализацию" as UC18
  usecase "Выбрать или создать навык" as UC20
  usecase "Загрузить материалы" as UC21
}

a --> UC17
UC17 <.. UC18: extend
UC20 <.. UC21: extend
UC18 <.. UC20: extend

package "Проверка грейда" {
  usecase "Открыть статистику" as UC22
  usecase "Пройти тест" as UC25
  usecase "Открыть материал с ошибками" as UC26
}

u --> UC22
UC22 ..> UC25: include
UC25 <.. UC26: extend

package "Обсуждение" {
  usecase "Создать топик" as UC28
  usecase "Добавить комментарий" as UC30
}

u <.. UC28: extend
e <.. UC28: extend
UC28 <.. UC30: extend

@enduml
```

---

## Sequence-диаграмма: загрузка домашнего задания

Диаграмма описывает поток взаимодействий при отправке и проверке домашнего задания.

```plantuml
@startuml

actor "User" as u
participant "Сайт" as s
database "БД" as db
participant "Почтовый сервис" as m
actor "Expert" as e

u -> s: Загрузить домашнее задание (файл)
activate s
s -> db: Сохранить файл и метаданные ДЗ
activate db
db --> s: OK (homework_id)
deactivate db
s -> m: Уведомить экспертов о новом ДЗ
activate m
m --> e: Email: "Новое ДЗ на проверку"
deactivate m
s --> u: ДЗ успешно загружено
deactivate s

e -> s: Открыть список ДЗ на проверку
activate s
s -> db: Получить ДЗ со статусом pending
activate db
db --> s: Список ДЗ
deactivate db
s --> e: Показать список ДЗ
deactivate s

e -> s: Выбрать ДЗ, выставить балл + комментарий
activate s
s -> db: Сохранить оценку и комментарий
activate db
db --> s: OK
deactivate db
s -> m: Уведомить пользователя о результате проверки
activate m
m --> u: Email: "Ваше ДЗ проверено"
deactivate m
s --> e: Оценка сохранена
deactivate s

@enduml
```

---

## Sequence-диаграмма: выбор специализации и прохождение урока

> **Шаблон раздела.** Детальная диаграмма добавляется по мере проработки соответствующего потока.

Основные шаги:
1. Пользователь выбирает специализацию из списка (`GET /specializations`)
2. Просматривает материалы специализации (`GET /specializations/{id}/materials`)
3. Открывает конкретный урок (`GET /specializations/{id}/materials/{material_id}`)
4. Отмечает урок как пройденный (`POST /materials/{id}/complete`)
5. Оставляет оценку уроку (`POST /materials/{id}/rate`)
