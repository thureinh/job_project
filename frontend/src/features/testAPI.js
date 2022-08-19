// A mock function to mimic making an async request for data
export function fetchSomething() {
    return new Promise((resolve) =>
        setTimeout(() => resolve(true), 2000)
    );
}