# YojiLabs Landing Page

This repository is the working codebase for the new YojiLabs public-facing landing page.

## Current Phase

The project is currently in spec/planning mode.

Primary planning document:

- `docs/superpowers/specs/2026-08-20-yojilabs-landing-page-design.md`

## Process Source of Truth

For planning discipline, build conventions, and frontend quality expectations, use the teammate harness as the process/source-of-truth reference:

- `wuTims/yojilabs-harness`

This repo does **not** provide the final visual design system for the landing page. The visual direction comes from the local YojiLabs brand and mockup assets.

## Local Development Intent

The landing page is intended to be developed localhost-first until the experience is complete enough to attach to the real root-domain site.

The first build should be fully runnable locally with mocked behavior for:

- booking flow
- project intake submissions
- general contact submissions
- demo data
- success states

## Config and Environment Notes

External URLs should be environment-driven from day one. Plan for configuration of:

- primary CTA destinations
- demo/app URLs
- contact endpoints
- canonical site URL
- Open Graph image URL
- any future external/legal/service URLs

Content that should stay easy to update without rewriting component structure:

- CTA labels
- contact info
- section headings and copy
- footer content
- hero preview datasets and labels

## Future Backend Notes

The first backend attachment point should be a simple internal YojiLabs-owned store for:

- project intake submissions
- general contact submissions

Future enhancement to plan for later:

- admin/dashboard management of leads and contact messages

Do not treat the admin/dashboard path as a v1 blocker for the landing page build.

## Asset Notes

For v1, the build may use a self-generated SVG version of the YojiLabs logo/symbol.

Later production polish should still consider:

- favicon set
- social share / OG image
- any official vector replacements if desired
