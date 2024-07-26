function Pagination({ current, totalPages, next, prev, go }) {
    const generatePageNumbers = () => {
        const pageNumbers = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            const numPagesBeforeCurrent = Math.floor((maxVisiblePages - 3) / 2)
            const numPagesAfterCurrent =
                maxVisiblePages - numPagesBeforeCurrent - 3

            if (current <= numPagesBeforeCurrent + 2) {
                for (let i = 1; i <= current + numPagesAfterCurrent + 1; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push('...')
                pageNumbers.push(totalPages)
            } else if (current >= totalPages - numPagesAfterCurrent - 1) {
                pageNumbers.push(1)
                pageNumbers.push('...')
                for (
                    let i = totalPages - numPagesBeforeCurrent - 2;
                    i <= totalPages;
                    i++
                ) {
                    pageNumbers.push(i)
                }
            } else {
                pageNumbers.push(1)
                pageNumbers.push('...')
                for (
                    let i = current - numPagesBeforeCurrent;
                    i <= current + numPagesAfterCurrent;
                    i++
                ) {
                    pageNumbers.push(i)
                }
                pageNumbers.push('...')
                pageNumbers.push(totalPages)
            }
        }

        return pageNumbers
    }

    const pageNumbers = generatePageNumbers()

    return (
        <>
            {pageNumbers.length > 1 && (
                <nav aria-label="Page navigation example">
                    <div aria-label="" className={`pagination-box`}>
                        <ul className="pagination">
                            <li
                                className={`page-item previous-btn page-item ${
                                    current === 1 ? 'disabled' : ''
                                }`}
                            >
                                <a
                                    // href="#tabs"
                                    className={`page-link user-select-none ${
                                        current === 1 ? 'disabled' : ''
                                    }`}
                                    onClick={prev}
                                >
                                    Previous
                                </a>
                            </li>
                            {pageNumbers.map((pageNumber, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${
                                        pageNumber === '...' ? 'disabled' : ''
                                    } ${
                                        current === pageNumber ? 'active' : ''
                                    }`}
                                >
                                    {pageNumber === '...' ? (
                                        <span className="page-link">...</span>
                                    ) : (
                                        <a
                                            href="#tabs"
                                            className="page-link user-select-none"
                                            onClick={() => go(pageNumber)}
                                        >
                                            {pageNumber}
                                        </a>
                                    )}
                                </li>
                            ))}
                            <li
                                className={`page-item next-btn ${
                                    current === totalPages ? 'disabled' : ''
                                }`}
                            >
                                <a
                                    className={`page-link user-select-none ${
                                        current === totalPages ? 'disabled' : ''
                                    }`}
                                    onClick={next}
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )}
        </>
    )
}

export default Pagination
