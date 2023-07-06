object "SimpleStorageYul" {
    code {
            let runtime_size := datasize("runtime)
            let runtime_offset := dataoffset("runtime")
            datacopy(0, runtime_offset, runtime_size)
            return(0, runtime_size)
    }
    object "runtime" {
        code {
            function selector() -> s {
                s := shr(224, calldataload(0))
            }

            switch selector()

            case 0x2e64cec1 {
                let memloc := retrieve()
                return (memloc, 32)
            }

            case 0x6057361d {
                store(calldataload(4))
            }

            default {
                revert(0, 0)
            }

            function retrieve() -> memloc {
                let val := sload(0)
                memloc := 0
                mstore(memloc, val)
            }

            function store(val) {
                sstore(0, val)
            }
        }
    }
}