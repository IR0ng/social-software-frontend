const Form = ({ ...props }) => {
  return (
    <form
      className="flex w-1/3 flex-col items-center gap-3 rounded-lg border border-black bg-white px-20 py-4"
      {...props}
    />
  )
}

export default Form
