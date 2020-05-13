H2-perf
=======

Usage
-----

**Server:**

```bash
./index
```

**Client:**

```bash
./index 10gb
```

Set env `HTTP=1` to use HTTP/1.1.

Some results
------------

As it might be hard to read the results without any context, here's couple
to see how are you doing. Unless marked as *Remote* the test were executed
against `localhost` and averaged over a few runs.

**Test results**

| Mach                  | HTTP/1.1  | HTTP/2        |
|-----------------------|-----------|---------------|
| 2x Dell R940 *Remote* | 9 Gbps    | 2 Gbps        |
| Dell R940             | 14.6 Gbps | 9.6 Gbps      |
| Dell PowerEdge T40    | 18.8 Gbps | 13.8 Gbps     |
| Dell Latitude 7400    | 20.9 Gbps | 16.95 Gbps    |
| Dell Latitude 7490    | 19.7 Gbps | 12.6 Gbps     |

**Machine details**

| Mach                  | Description                                                                       |
|-----------------------|-----------------------------------------------------------------------------------|
| 2x Dell R940 *Remote* | Between two Dell R940 with 4x Intel Xeon 8268 CPUs and 4x Intel Xeon 8268M CPUs   |
| Dell R940             | Within one Dell R940 with 4x Intel Xeon 8280M CPUs                                |
| Dell PowerEdge T40    | Dell PowerEdge T40 9YP37 with Intel Xeon E-2224G CPU @ 3.50GHz and 8 GB ECC RAM   |
| Dell Latitude 7400    | Dell Latitude 7400 laptop with i7-8665U CPU                                       |
| Dell Latitude 7490    | Dell Latitude 7490 laptop with Intel i7-8650U CPU @ 1.90GHz                       |
