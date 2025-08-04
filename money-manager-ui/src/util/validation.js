export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};

export const validateRegistration = ({ formData, setError }) => {
  if (!formData.fullName.trim()) {
    return setError("Please enter your full name.");
  } else if (!formData.email.trim()) {
    return setError("Please enter your email.");
  } else if (!formData.password.trim()) {
    return setError("Please enter your password.");
  } else if (!validateEmail(formData.email)) {
    return setError("Please enter a valid email address.");
  } else if (!validatePassword(formData.password)) {
    return setError(
      "Password must be at least 8 characters long and include uppercase, lowercase letters, and numbers."
    );
  }

  setError(null);
  return true;
};

export const validateLogin = ({ formData, setError }) => {
  if (!formData.email.trim()) {
    return setError("Please enter your email.");
  } else if (!formData.password.trim()) {
    return setError("Please enter your password.");
  } else if (!validateEmail(formData.email)) {
    return setError("Please enter a valid email address.");
  }

  setError(null);
  return true;
};

export const validateCategory = ({ category }) => {
  if (!category.name.trim()) {
    return "Please enter a category name.";
  } else if (!category.type) {
    return "Please select a category type.";
  }

  return null;
};

export const isDuplicateCategory = (categories, newCategory) => {
  return categories.some(
    (category) =>
      category.name.toLowerCase() === newCategory.name.toLowerCase() &&
      category.type === newCategory.type &&
      category.id !== newCategory.id // Ensure we don't match the same category being updated
  );
};

export const formatCurrency = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return "";

  // Split integer and decimal parts
  const parts = num.toFixed(2).split("."); // keep two decimals; adjust if you don't want trailing zeros
  let intPart = parts[0];
  const decPart = parts[1];

  // Apply Indian grouping to integer part:
  // last 3 digits stay together, preceding digits grouped by 2
  const lastThree = intPart.slice(-3);
  let rest = intPart.slice(0, -3);
  if (rest !== "") {
    // insert commas every 2 digits from right in the rest
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    intPart = rest + "," + lastThree;
  } else {
    intPart = lastThree;
  }

  // Remove trailing .00 if not needed: if decimals are ".00", omit them
  const formattedNumber = decPart === "00" ? intPart : `${intPart}.${decPart}`;

  return `₹${formattedNumber}`;
};

export const validateIncome = ({ income }) => {
  if (!income.name.trim()) {
    return "Please enter an income name.";
  } else if (!income.amount || isNaN(income.amount) || income.amount <= 0) {
    return "Please enter a valid income amount.";
  } else if (!income.categoryId) {
    return "Please select an income category.";
  } else if (!income.date) {
    return "Please select an income date.";
  }
  const today = new Date().toISOString().split("T")[0];
  if (income.date > today) {
    return "Income date cannot be in the future.";
  }

  return null;
};

export const validateExpense = ({ expense }) => {
  if (!expense.name.trim()) {
    return "Please enter an expense name.";
  } else if (!expense.amount || isNaN(expense.amount) || expense.amount <= 0) {
    return "Please enter a valid expense amount.";
  } else if (!expense.categoryId) {
    return "Please select an expense category.";
  } else if (!expense.date) {
    return "Please select an expense date.";
  }
  const today = new Date().toISOString().split("T")[0];
  if (expense.date > today) {
    return "Expense date cannot be in the future.";
  }

  return null;
};

export const prepareIncomeOrExpenseLineChartData = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  // Helper to get ordinal (1st, 2nd, 3rd, 4th, etc.)
  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  // Normalize a date string/Date to YYYY-MM-DD (local date)
  function normalizeDate(input) {
    const d = input instanceof Date ? input : new Date(input);
    // Get year-month-day in local time
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  // Group by normalized date
  const map = transactions.reduce((acc, tx) => {
    const dayKey = normalizeDate(tx.date);
    if (!acc[dayKey]) acc[dayKey] = { items: [], total: 0 };
    acc[dayKey].items.push(tx);
    acc[dayKey].total += Number(tx.amount) || 0;
    return acc;
  }, {});

  // Sort dates ascending
  const sortedDates = Object.keys(map).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Format result
  return sortedDates.map((dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const monthShort = dateObj.toLocaleString("en-US", { month: "short" }); // e.g., "Aug"
    return {
      date: dateStr,
      items: map[dateStr].items,
      month: `${getOrdinal(day)} ${monthShort}`,
      totalamount: parseFloat(map[dateStr].total.toFixed(2)),
    };
  });
};
