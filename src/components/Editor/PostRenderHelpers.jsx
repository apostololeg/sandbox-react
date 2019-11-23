import { h } from 'preact'

export default function PostRenderHelpers() {
  return (
    <style>
      {[1,2,3,4,5,6,7,8,9,10].map(
        i => `.ql-indent-${i} { margin-left: ${i * 30}px; }`
      )}
      {`
        .ql-align-center {
          text-align: center;
        }
        .ql-align-right {
          text-align: right;
        }
      `}
    </style>
  )
}
