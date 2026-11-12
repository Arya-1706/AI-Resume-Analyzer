import { UserIcon, UploadIcon, InfoIcon } from './icons'
import { MAX_RESUME_SIZE_MB } from '../interview.constants'

export default function ProfilePanel({
  resumeFile,
  onResumeChange,
  selfDescription,
  onSelfDescriptionChange,
}) {
  return (
    <div className='panel panel--right'>
      <div className='panel__header'>
        <span className='panel__icon'>
          <UserIcon size={18} />
        </span>

        <h2>Your Profile</h2>
      </div>

      <div className='upload-section'>
        <div className='section-label'>
          Upload Resume
          <span className='badge badge--best'>Best Results</span>
        </div>

        <label className='dropzone' htmlFor='resume'>
          <span className='dropzone__icon'>
            <UploadIcon size={28} />
          </span>

          <p className='dropzone__title'>
            {resumeFile
              ? resumeFile.name
              : 'Click to upload or drag & drop'}
          </p>

          <p className='dropzone__subtitle'>
            PDF only (Max {MAX_RESUME_SIZE_MB}MB)
          </p>

          <input
            hidden
            type='file'
            id='resume'
            name='resume'
            accept='application/pdf'
            onChange={(e) =>
              onResumeChange(e.target.files[0] ?? null)
            }
          />
        </label>
      </div>

      <div className='or-divider'>
        <span>OR</span>
      </div>

      <div className='self-description'>
        <label className='section-label' htmlFor='selfDescription'>
          Quick Self-Description
        </label>

        <textarea
          id='selfDescription'
          name='selfDescription'
          className='panel__textarea panel__textarea--short'
          value={selfDescription}
          onChange={(e) =>
            onSelfDescriptionChange(e.target.value)
          }
          placeholder='Briefly describe your experience, key skills, and years of experience if you do not have a resume handy...'
        />
      </div>

      <div className='info-box'>
        <span className='info-box__icon'>
          <InfoIcon />
        </span>

        <p>
          Either a <strong>Resume</strong> or a{' '}
          <strong>Self Description</strong> is required to generate
          a personalized plan.
        </p>
      </div>
    </div>
  )
}