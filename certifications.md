---
layout: page
title: Certifications
---

# Certifications

These are the certifications I have earned:

<ul>
  {% for certification in site.data.certifications %}
    <li>
      <a href="{{ certification.link }}">{{ certification.name }}</a><br>
      <small>{{ certification.issuer }} - {{ certification.year_issued }}</small>
    </li>
  {% endfor %}
</ul>
