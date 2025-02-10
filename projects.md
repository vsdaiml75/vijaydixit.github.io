---
layout: page
title: Projects
---

# Projects

Here are some of the projects I've worked on:

<ul>
  {% for project in site.data.projects %}
    <li>
      <a href="{{ project.link }}">{{ project.title }}</a><br>
      <small>{{ project.technologies | join: ", " }}</small><br>
      <p>{{ project.description }}</p>
    </li>
  {% endfor %}
</ul>
