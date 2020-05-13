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

Some results
------------

As it might be hard to read the results without any context, here's couple
to see how are you doing.

**HTTP/2**

* **REMOTELY** between two Dell R940 with 4x Intel Xeon 8268 CPUs 
  and 4x Intel Xeon 8268M CPUs, both having 4x10G bonded NICs: ~2-2.2 Gbps

* **LOCALLY** within one Dell R940 with 4x Intel Xeon 8280M CPUs: ~9.6 Gbps

* **LOCALLY** on Dell Latitude 7400 laptop with i7-8665U CPU: ~16.4-17.5 Gbps

* **LOCALLY** on DELL PowerEdge T40 9YP37 with Xeon E-2224G CPU: ~13.8 Gbps

* **LOCALLY** on Dell Latitude 7490 laptop with Intel i7-8650U CPU @ 1.90GHz: ~12.6 Gbps

**HTTP/1.1**

* **LOCALLY** on Dell Latitude 7490 laptop with Intel i7-8650U CPU @ 1.90GHz: ~19.7 Gbps
