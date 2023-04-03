const hourToMinutes = (hourMinutes: string): number => {
  const [hour, minutes] = hourMinutes.split(":")
  return parseInt(parseInt(hour) * 60 + minutes)
}

const sliceMinutes = (
  inicio: string,
  final: string,
  durationInSeconds = 1800,
): string[] => {
  const slices = []

  const [horaInicio, minutoInicio] = inicio.split(":")
  const [horaFinal, minutoFinal] = final.split(":")

  const horarioInicial = new Date(
    null,
    null,
    null,
    parseInt(horaInicio),
    parseInt(minutoInicio),
  )
  const horarioFinal = new Date(
    null,
    null,
    null,
    parseInt(horaFinal),
    parseInt(minutoFinal),
  )

  while (horarioFinal.getTime() >= horarioInicial.getTime()) {
    const getHora = horarioInicial.getHours()
    const horarioAlmoco = getHora === 12 || getHora === 13
    const formatacaoData = horarioInicial.toLocaleTimeString("pt-br", {
      hour: "numeric",
      minute: "numeric",
    })

    if (!horarioAlmoco) slices.push(formatacaoData)

    horarioInicial.setSeconds(durationInSeconds)
  }

  return slices
}

export { hourToMinutes, sliceMinutes }
