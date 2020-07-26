const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((r) => r.json());

export default fetcher;
