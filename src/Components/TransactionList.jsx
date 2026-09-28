const TransactionList = ({
  transactions,
  deleteTransaction,
  editTransaction,
}) => {
  return (
    <div className="transactionList">
      <h3>Transaction List</h3>

      {transactions.length === 0 ? (
        <p className="transactionMsg">No transactions found</p>
      ) : (
        transactions.map((transaction) => (
          <div className="transactionCard" key={transaction.id}>
            <div className="transactionInfo">
              <h3 className="transactionTitle">{transaction.title}</h3>
              <p className="transactionCategory">{transaction.category}</p>

              <p
                className={`transactionType ${transaction.type === "Income" ? "incomeType" : "expenseType"}`}
              >
                {transaction.type}
              </p>
            </div>

            {/*CSS style me Right side: amount aur action buttons */}
            <div className="transactionRight">
              {/* yaha par ye condition ke hisab se  Amount ke aage + aur - ka sign lagg jayega */}
              <p className="transactionAmount">
                {transaction.type === "Income" ? "+" : "-"} ₹
                {transaction.amount}
              </p>

              <div className="transactionActions">
                {/* ID pass kar rahe hain taaki correct transaction delete ho */}
                <button
                  className="deleteBtn"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </button>

                {/* ID pass kar rahe hain taaki correct transaction edit ho */}
                <button
                  className="editBtn"
                  onClick={() => editTransaction(transaction.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
