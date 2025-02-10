---
layout: page
title: Courses
---

# Courses

Here are the courses I have completed:

<ul>
  {% for course in site.data.courses %}
    <li>
      <a href="{{ course.link }}">{{ course.name }}</a><br>
      <small>{{ course.institution }} - {{ course.year_completed }}</small><br>
      <p>{{ course.description }}</p>
    </li>
  {% endfor %}
</ul>
