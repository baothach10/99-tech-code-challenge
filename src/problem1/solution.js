var sum_to_n_a = function (n) {
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result += i;
  }

  return result;
};

var sum_to_n_b = function (n) {
  let start = 0;
  let end = n;
  let result = 0;
  while (start <= end) {
    result += start + end;
    start++;
    end--;
  }

  return result;
};

var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
