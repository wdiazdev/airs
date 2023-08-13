export function formatInput(input: any) {
  // Remove any non-numeric characters and leading zeros
  let inputValue = input.value.replace(/[^0-9]/g, '').replace(/^0+/g, '')

  // Add commas for thousands separation
  inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // If the input is empty, set it to 0
  if (inputValue === '') {
    inputValue = '0'
  }
}
