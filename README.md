# lcwTourGuide

**lcwTourGuide** is a lightweight JavaScript library for creating guided tours on web pages. Easily highlight elements, add tooltips, and guide users through your UI with callbacks for start, step change, and end events.

## Features

- Highlight elements on your page.
- Display tooltips with custom text.
- Navigate steps with "Next" and "Previous".
- Callbacks for `onStart`, `onStep`, and `onEnd`.
- Easy to integrate via CDN or npm.

## Installation

### Via CDN

```
https://cdn.jsdelivr.net/gh/LearnCodeWeb/lcwTourGuide@v-1.0/src/lcwTourGuide.css
```
```
https://cdn.jsdelivr.net/gh/LearnCodeWeb/lcwTourGuide@v-1.0/src/lcwTourGuide.js
```

# HTML
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/LearnCodeWeb/lcwTourGuide@v-1.0/src/lcwTourGuide.css">
<script src="https://cdn.jsdelivr.net/gh/LearnCodeWeb/lcwTourGuide@v-1.0/src/lcwTourGuide.js"></script>
```


## 🚀 Usage

### 1. Mark elements for the tour

Add `data-lcw-tour-step` and `data-lcw-tour-text` attributes to elements:

```
<button data-lcw-tour-step="1" data-lcw-tour-text="Click here to create a new item">
  New Item
</button>

<input type="text" data-lcw-tour-step="2" data-lcw-tour-text="Enter the name here">

<div data-lcw-tour-step="3" data-lcw-tour-text="Finally, click Save">
  Save
</div>
```

* `data-lcw-tour-step="1"` → defines the order
* `data-lcw-tour-text="..."` → tooltip text


### 2. Initialize the tour

```
document.addEventListener('DOMContentLoaded', () => {
  const tour = new lcwTourGuide({
    onStart: () => console.log("✅ Tour started"),
    onStep: (index, el) => console.log(`➡️ Step ${index + 1}:`, el),
    onEnd: () => console.log("🏁 Tour finished")
  });

  tour.start();
});
```

---

## ⚙️ Options

| Option    | Type     | Default             | Description                     |
| --------- | -------- | ------------------- | ------------------------------- |
| `onStart` | Function | `() => {}`          | Called when the tour starts     |
| `onStep`  | Function | `(index, el) => {}` | Called when a step is displayed |
| `onEnd`   | Function | `() => {}`          | Called when the tour ends       |

---

## 🎨 Styling

Default styles can be customized:

```
.lcw-tour-tooltip {
    position: absolute;
    background: #ffffff;
    color: #444;
    padding: 16px;
    border-radius: 6px;
    max-width: 280px;
    z-index: 10001;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.lcw-tour-tooltip button {
    margin-top: 10px;
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.lcw-tour-tooltip button:hover {
    background: #0056b3;
}

.lcw-tour-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
}

.lcw-tour-highlight {
    position: relative;
    z-index: 10002;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.7);
    border-radius: 4px;
    background-color: white;
}

.lcw-tour-close {
    position: absolute;
    top: 8px;
    right: 10px;
    color: white;
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
}

.lcw-tour-close:hover {
    color: #ff6b6b;
}
```

## 📜 License

MIT License. Free to use in personal and commercial projects.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork, improve, and submit pull requests.
